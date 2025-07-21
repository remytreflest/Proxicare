import express from 'express';
import { Prescription } from '@/models/Prescription';
import { PrescriptionHealthcareAct } from '@/models/PrescriptionHealthcareAct';
import HealthcareAct from '@/models/HealthcareAct';
import { iPrescriptionHealthcareAct } from '@/interfaces/iPrescriptionHealthcareAct';
import Patient from '@/models/Patient';
import { PrescriptionHealthcareactsStatus } from '@/resources/emuns/prescriptionHealthcareactsStatus';
import { col, Op } from 'sequelize';
import { User } from '@/models/User';
import { Structure } from '@/models/Structure';
import HealthcareProfessional from '@/models/HealthcareProfessional';
import Appointment from '@/models/Appointment';

const router = express.Router();

/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Crée une prescription et les actes associés pour un patient
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [socialSecurityNumber, startDate, endDate, acts]
 *             properties:
 *               socialSecurityNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               acts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, occurrencesPerDay]
 *                   properties:
 *                     id:
 *                       type: integer
 *                     occurrencesPerDay:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Prescription créée avec succès
 *       400:
 *         description: Champs requis manquants ou invalides
 *       404:
 *         description: Patient ou acte introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post('/prescriptions', async (req: any, res: any) => {
  try {
    const { socialSecurityNumber, startDate, endDate, acts} = req.body;

    if (!socialSecurityNumber || !startDate || !endDate || !Array.isArray(acts)) {
      return res.status(400).json({ message: 'Champs requis manquants ou invalides.' });
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        return res.status(400).json({ message: 'Les dates ne sont pas valides.' });
    }

    if (startDateObj >= endDateObj) {
        return res.status(400).json({ message: 'La date de début doit être antérieure à la date de fin.' });
    }

    const patient = await Patient.findOne({ where: { SocialSecurityNumber: socialSecurityNumber } });
    if (!patient) {
      return res.status(404).json({ message: 'Patient non trouvé.' });
    }

    for (const act of acts as iPrescriptionHealthcareAct[]) {
        
        const existingAct = await HealthcareAct.findByPk(act.id);
        if (!existingAct) {
            return res.status(404).json({ message: `Acte de soin ID ${act.id} introuvable.` });
        }

        if (typeof act.occurrencesPerDay !== 'number' || act.occurrencesPerDay <= 0) {
            return res.status(400).json({ message: `OccurrencesPerDay invalide pour l'acte ${act.id}.` });
        }
    }

    const prescription = await Prescription.create({
      SocialSecurityNumber: socialSecurityNumber,
      StartDate: startDateObj,
      EndDate: endDateObj
    });

    for (const act of acts) {
      await PrescriptionHealthcareAct.create({
        PrescriptionId: prescription.Id,
        HealthcareActId: act.id,
        OccurrencesPerDay: act.occurrencesPerDay,
        Status: PrescriptionHealthcareactsStatus.TO_BE_PLANNED
      });
    }

    return res.status(201).json({ message: 'Prescription enregistrée avec succès.' });
  } catch (error) {
    console.error('Erreur création prescription:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * @swagger
 * /prescriptions/patient:
 *   get:
 *     summary: Récupère les prescriptions du patient connecté
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des prescriptions
 *       400:
 *         description: Utilisateur non authentifié
 *       403:
 *         description: Aucun patient associé
 *       500:
 *         description: Erreur serveur
 */
router.get('/prescriptions/patient', async (req: any, res: any) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "Utilisateur non authentifié." });
  }

  try {
    const patient = await Patient.findOne({ where: { UserId: userId } });
    if (!patient) {
      return res.status(403).json({ message: "Aucun patient associé à cet utilisateur." });
    }

    const prescriptions = await Prescription.findAll({
      where: { SocialSecurityNumber: patient.SocialSecurityNumber },
      include: [
        {
          model: PrescriptionHealthcareAct,
          include: [HealthcareAct],
        }
      ]
    });

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Erreur récupération prescriptions:', error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

/**
 * @swagger
 * /prescriptions/healthcareprofessional:
 *   get:
 *     summary: Récupère les prescriptions des patients liés aux structures du soignant connecté
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des prescriptions liées aux structures
 *       400:
 *         description: Utilisateur non authentifié
 *       404:
 *         description: Professionnel ou structure introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/prescriptions/healthcareprofessional', async (req: any, res: any) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: 'Utilisateur non authentifié' });
  }

  try {
    const healthcareProfessional = await HealthcareProfessional.findOne({
      where: { UserId: userId },
      include: [{ model: Structure }],
    });

    if (!healthcareProfessional) {
      return res.status(404).json({ message: 'Professionnel de santé introuvable' });
    }

    const structureIds = healthcareProfessional.Structures?.map(s => s.Id);
    if (!structureIds || structureIds.length === 0) {
      return res.status(404).json({ message: 'Aucune structure associée au professionnel' });
    }

    const prescriptions = await Prescription.findAll({
      where: {
        StartDate: { [Op.gte]: new Date() },
      },
      include: [
        {
          model: Patient,
          as: 'Patient',
          required: true,
          on: {
            '$Prescription.SocialSecurityNumber$': {
              [Op.eq]: col('Patient.SocialSecurityNumber'),
            },
          },
          where: { StructureId: { [Op.in]: structureIds } },
          include: [
            {
              model: User,
              as: 'User',
              attributes: ['FirstName', 'LastName', 'Email'],
            },
          ],
        },
        {
          model: PrescriptionHealthcareAct,
          include: [
            HealthcareAct,
            {
              model: Appointment, // ✅ on ajoute l'Appointment ici
              as: 'Appointments',
            },
          ],
        },
      ],
    });

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Erreur récupération prescriptions :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

export default router;