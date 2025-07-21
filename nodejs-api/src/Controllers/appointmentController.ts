import express from 'express';
import Appointment from '@/models/Appointment';
import HealthcareProfessional from '@/models/HealthcareProfessional';
import HealthcareAct from '@/models/HealthcareAct';
import { AppointmentsStatusEnum } from '@/resources/emuns/appointmentsStatus';
import Patient from '@/models/Patient';
import { User } from '@/models/User';
import { Op } from 'sequelize';
import HealthcareProfessionalHealthcareAct from '@/models/HealthcareProfessionalHealthcareAct';
import { PrescriptionHealthcareAct } from '@/models/PrescriptionHealthcareAct';
import { PrescriptionHealthcareactsStatus } from '@/resources/emuns/prescriptionHealthcareactsStatus';

const router = express.Router();

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Récupère tous les rendez-vous liés à l'utilisateur (patient ou professionnel)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des rendez-vous
 *       403:
 *         description: Utilisateur inconnu ou non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.get('/appointments', async (req: any, res: any) => {
  
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(403).json({ message: "Utilisateur inconnu." });
    }

    const [patient, healthcareprofessional] = await Promise.all([
      Patient.findOne({ where: { UserId: user.Id } }),
      HealthcareProfessional.findOne({ where: { UserId: user.Id } }),
    ]);

    if (!patient && !healthcareprofessional) {
      return res.status(403).json({ message: "Aucun rendez-vous disponible pour cet utilisateur." });
    }

    const conditions: any[] = [];

    if (patient) {
      conditions.push({ PatientId: patient.Id });
    }

    if (healthcareprofessional) {
      conditions.push({ HealthcareProfessionalId: healthcareprofessional.Id });
    }

    const appointments = await Appointment.findAll({
      where: { [Op.or]: conditions },
      order: [['AppointmentStartDate', 'ASC']],
    });

    return res.status(200).json(appointments);

  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne lors de la récupération des rendez-vous.' });
  }
});

/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Crée un rendez-vous médical
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - prescriptionHealthcareActId
 *               - appointmentStartDate
 *               - appointmentEndDate
 *             properties:
 *               patientId:
 *                 type: integer
 *               prescriptionHealthcareActId:
 *                 type: integer
 *               appointmentStartDate:
 *                 type: string
 *                 format: date-time
 *               appointmentEndDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Rendez-vous créé
 *       400:
 *         description: Données invalides ou manquantes
 *       403:
 *         description: Professionnel non autorisé
 *       404:
 *         description: Patient, professionnel ou acte non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post('/appointment', async (req: any, res: any) => {
    
  try {
    const userId = req.userId;

    const {
        patientId,
        prescriptionHealthcareActId,
        appointmentStartDate,
        appointmentEndDate,
    } = req.body;

    if (!patientId || !prescriptionHealthcareActId || !appointmentStartDate || !appointmentEndDate) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const startDate = new Date(appointmentStartDate);
    const endDate = new Date(appointmentEndDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: 'Les dates ne sont pas valides.' });
    }

    if (startDate >= endDate) {
        return res.status(400).json({ message: 'La date de début doit être antérieure à la date de fin.' });
    }

    const now = new Date();
    if (startDate <= now || endDate <= now) {
        return res.status(400).json({ message: 'Les dates doivent être dans le futur.' });
    }

    const existingPatientId = await Patient.findOne({ where: { Id: patientId } });
    if (!existingPatientId) {
        return res.status(404).json({ error: 'Le patient n\'a pas été trouvé' });
    }

    const healthcareProfessional = await HealthcareProfessional.findOne({
      where: { UserId: req.userId }, // ou directement userId si tu l'as en variable
    });

    if (!healthcareProfessional) {
        return res.status(404).json({ error: 'Vous êtes pas un professionnel de santé' });
    }

    const existinghealthcareProfessionalId = await HealthcareProfessional.findOne({ where: { Id: healthcareProfessional.Id } });
    if (!existinghealthcareProfessionalId) {
        return res.status(404).json({ error: 'Le professionnel de soins n\'a pas été trouvé' });
    }

    const existinghealthcareActId = await HealthcareAct.findOne({ where: { Id: healthcareProfessional.Id  } });
    if (!existinghealthcareActId) {
        return res.status(404).json({ error: 'L\'acte n\'a pas été trouvé' });
    }

    const prescriptionAct = await PrescriptionHealthcareAct.findByPk(prescriptionHealthcareActId);
    if (!prescriptionAct) {
      return res.status(404).json({ error: 'L\'acte de prescription est introuvable.' });
    }

    const healthcareActId = prescriptionAct.HealthcareActId;

    const hasActLink = await HealthcareProfessionalHealthcareAct.findOne({
      where: {
        HealthcareProfessionalId: healthcareProfessional.Id,
        HealthcareActId: healthcareActId,
      },
    });

    if (!hasActLink) {
      return res.status(403).json({
        message: 'Ce professionnel n\'est pas autorisé à réaliser cet acte.',
      });
    }

    const appointment = await Appointment.create({
      PatientId: patientId,
      HealthcareProfessionalId: healthcareProfessional.Id,
      PrescriptionHealthcareActId: prescriptionHealthcareActId,
      Status: AppointmentsStatusEnum.PLANNED,
      AppointmentStartDate: appointmentStartDate,
      AppointmentEndDate: appointmentEndDate,
    });

    prescriptionAct.Status = PrescriptionHealthcareactsStatus.PLANNED;
    await prescriptionAct.save();

    res.status(201).json(appointment);
  } 
  catch (error) 
  {
    console.log(error)
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Supprime un rendez-vous
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du rendez-vous
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rendez-vous supprimé
 *       400:
 *         description: ID invalide
 *       403:
 *         description: L'utilisateur n'est pas lié au rendez-vous
 *       404:
 *         description: Rendez-vous introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete('/appointment/:id', async (req: any, res: any) => {

  const appointmentId = parseInt(req.params.id);
  const userId = req.userId;

  if (!appointmentId || isNaN(appointmentId)) {
    return res.status(400).json({ message: 'ID de rendez-vous invalide' });
  }

  try {
    const appointment = await Appointment.findOne({
      where: {
        Id: appointmentId
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous introuvable ou non autorisé' });
    }

    const user = await User.findOne({ where: { UserId: userId } });
    if (!user) {
      return res.status(403).json({ message: "Vous n'êtes pas un utilisateur de notre site" });
    }

    const patient = await Patient.findOne({ where: { UserId: user.Id } });
    const healthcareprofessional = await HealthcareProfessional.findOne({ where: { UserId: user.Id } });
    if (!patient && !healthcareprofessional) {
      return res.status(403).json({ message: "Vous n'êtes ni le patient ni le professionel de soins, il est impossible de supprimer ce rendez vous" });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });

  } catch (error) 
  {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du rendez-vous" });
  }
});

export default router;