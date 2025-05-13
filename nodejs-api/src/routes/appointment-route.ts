import express from 'express';
import Appointment from '../models/Appointment';
import HealthcareProfessional from '../models/HealthcareProfessional';
import HealthcareAct from '../models/HealthcareAct';
import { AppointmentsStatusEnum } from '../resources/emuns/appointmentsStatus';
import Patient from '../models/Patient';
import User from '../models/User';

const router = express.Router();

/**
 * Crée un rendez-vous médical (Appointment)
 * @route POST /appointment
 * @body {
 *   patientId: number,
 *   healthcareProfessionalId: number,
 *   healthcareActId: number,
 *   status: string,
 *   appointmentStartDate: Date,
 *   appointmentEndDate: Date
 * }
 */
router.post('/appointment', async (req: any, res: any) => {
    
    const {
        patientId,
        healthcareProfessionalId,
        healthcareActId,
        status,
        appointmentStartDate,
        appointmentEndDate,
    } = req.body;

    if (!patientId || !healthcareProfessionalId || !healthcareActId || !status || !appointmentStartDate || !appointmentEndDate) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingPatientId = await Patient.findOne({ where: { Id: patientId } });
    if (!existingPatientId) {
        return res.status(404).json({ error: 'Le patient n\'a pas été trouvé' });
    }

    const existinghealthcareProfessionalId = await HealthcareProfessional.findOne({ where: { Id: healthcareProfessionalId } });
    if (!existinghealthcareProfessionalId) {
        return res.status(404).json({ error: 'Le professionnel de soins n\'a pas été trouvé' });
    }

    const existinghealthcareActId = await HealthcareAct.findOne({ where: { Id: healthcareProfessionalId } });
    if (!existinghealthcareActId) {
        return res.status(404).json({ error: 'L\'acte n\'a pas été trouvé' });
    }

    if (!Object.values(AppointmentsStatusEnum).includes(status)) {
        return res.status(400).json({ message: 'Statut invalide.' });
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

  try {
    const appointment = await Appointment.create({
      PatientId: patientId,
      HealthcareProfessionalId: healthcareProfessionalId,
      HealthcareActId: healthcareActId,
      Status: status,
      AppointmentStartDate: appointmentStartDate,
      AppointmentEndDate: appointmentEndDate,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    res.status(201).json(appointment);
  } 
  catch (error) 
  {
    console.error('Erreur lors de la création du rendez-vous :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

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
    const caregiver = await HealthcareProfessional.findOne({ where: { UserId: user.Id } });
    if (!patient && !caregiver) {
      return res.status(403).json({ message: "Vous n'êtes ni le patient ni le professionel de soins, il est impossible de supprimer ce rendez vous" });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });

  } catch (error) 
  {
    console.error('Erreur suppression rendez-vous:', error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du rendez-vous" });
  }
});

export default router;