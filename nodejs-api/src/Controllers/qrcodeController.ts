import { Router, Request, Response } from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { Prescription } from '@/models/Prescription';
import { PrescriptionHealthcareAct } from '@/models/PrescriptionHealthcareAct';
import HealthcareAct from '@/models/HealthcareAct';
import Patient from '@/models/Patient';
import { User } from '@/models/User';
import { PrescriptionHealthcareactsStatus } from '@/resources/emuns/prescriptionHealthcareactsStatus';
import HealthcareProfessional from '@/models/HealthcareProfessional';
import Appointment from '@/models/Appointment';

const router = Router();

/**
 * @swagger
 * /qrcode/patient/{prescriptionHealthcareActId}:
 *   get:
 *     summary: Génère un QR code temporaire pour un soin en attente
 *     tags: [QR Code]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prescriptionHealthcareActId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'acte de prescription à valider
 *     responses:
 *       201:
 *         description: QR Code généré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 qrCodeDataUrl:
 *                   type: string
 *                   format: uri
 *                   description: URL base64 du QR code
 *       400:
 *         description: Le soin est déjà validé, annulé ou non planifié
 *       403:
 *         description: L’utilisateur n’est pas le bon patient
 *       404:
 *         description: Soin introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/qrcode/patient/:prescriptionHealthcareActId', async (req: any, res: any) => {
  try {
    const { prescriptionHealthcareActId } = req.params;
    const userId = req.userId; // supposé injecté par un middleware d'auth

    // Récupération complète du soin avec prescription + patient + rdv
    const prescriptionAct = await PrescriptionHealthcareAct.findByPk(prescriptionHealthcareActId, {
      include: [
        {
          model: Prescription,
          include: [{ model: Patient, include: [User] }],
        },
        {
          model: Appointment,
          required: false,
        }
      ],
    });

    if (!prescriptionAct) return res.status(404).json({ message: 'Acte de prescription introuvable.' });

    if (prescriptionAct.Status === PrescriptionHealthcareactsStatus.PERFORMED) {
      return res.status(400).json({ message: 'Ce soin a déjà été validé.' });
    }

    if (prescriptionAct.Status === PrescriptionHealthcareactsStatus.TO_BE_PLANNED) {
      return res.status(400).json({ message: 'Ce soin n\'est pas encore prévu.' });
    }

    if (prescriptionAct.Status === PrescriptionHealthcareactsStatus.CANCELLED) {
      return res.status(400).json({ message: 'Ce soin a été annulé.' });
    }

    // Vérifie que l'utilisateur connecté est bien le patient concerné
    const patient = prescriptionAct.Prescription?.Patient;
    if (!patient || patient.UserId !== userId) {
      return res.status(403).json({ message: 'Accès interdit. Ce soin ne vous appartient pas.' });
    }

    // Vérifie qu'il existe au moins un rendez-vous
    const validAppointments = prescriptionAct.Appointments?.filter(appointment => {
      return appointment.AppointmentEndDate >= new Date();
    });

    if (!validAppointments || validAppointments.length === 0) {
      return res.status(400).json({ message: 'Aucun rendez-vous actif pour ce soin.' });
    }

    // Génère token + limite de validité
    const token = uuidv4();
    const limit = new Date(Date.now() + 15 * 1000); // 15s

    await prescriptionAct.update({
      validateToken: token,
      validateTokenLimitTime: limit,
    });

    const host = process.env.LOCAL_IP_SAME_WIFI ? process.env.FRONT_URL_LOCAL : process.env.FRONT_URL;
    const url = `${host}/validate-act/healthcareprofessional/${prescriptionHealthcareActId}/${token}`;
    const qrCodeDataUrl = await QRCode.toDataURL(url);

    return res.status(201).json({ qrCodeDataUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur interne serveur.' });
  }
});

/**
 * @swagger
 * /validate/healthcareprofessional/{prescriptionHealthcareActId}/{token}:
 *   get:
 *     summary: Valide un soin par un professionnel de santé via un token
 *     tags: [QR Code]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prescriptionHealthcareActId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'acte de prescription à valider
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton temporaire de validation
 *     responses:
 *       200:
 *         description: Soin validé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 healthcareAct:
 *                   type: string
 *                 patientName:
 *                   type: string
 *                 validatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Le soin est déjà validé ou token invalide/expiré
 *       403:
 *         description: Le soignant n’est pas lié au patient
 *       404:
 *         description: Données introuvables
 *       500:
 *         description: Erreur serveur
 */
router.get('/validate/healthcareprofessional/:prescriptionHealthcareActId/:token', async (req: any, res: any) => {
  try {
    console.log(req.params)
    const { prescriptionHealthcareActId, token } = req.params;
    const userId = req.userId;

    const prescriptionAct = await PrescriptionHealthcareAct.findByPk(prescriptionHealthcareActId, {
      include: [
        { model: HealthcareAct },
        {
          model: Prescription,
          include: [{ model: Patient, include: [User] }],
        },
      ],
    });

    if (!prescriptionAct) return res.status(404).json({ message: 'Prescription introuvable.' });

    if (!prescriptionAct.Prescription || 
        !prescriptionAct.Prescription.Patient ||
        !prescriptionAct.Prescription.Patient.User
    ) return res.status(404).json({ message: 'Problème durant la récupération des données.' });

    if (prescriptionAct.Status === PrescriptionHealthcareactsStatus.PERFORMED) {
      return res.status(400).json({ message: 'Ce soin a déjà été validé.' });
    }

    if (
      !prescriptionAct.validateToken ||
      prescriptionAct.validateToken !== token ||
      !prescriptionAct.validateTokenLimitTime ||
      new Date() > prescriptionAct.validateTokenLimitTime
    ) {
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }

    // Vérifie si le soignant connecté est bien lié à l’acte
    const professional = await HealthcareProfessional.findOne({
      where: { UserId: userId },
      include: ['Structures'],
    });

    if (!professional) return res.status(403).json({ message: 'Soignant non autorisé.' });

    const patientStructureId = prescriptionAct.Prescription.Patient.StructureId!;
    const professionalStructureIds = professional.Structures?.map((s) => s.Id);

    if (!professionalStructureIds || !professionalStructureIds.includes(patientStructureId)) {
      return res.status(403).json({ message: 'Vous n’êtes pas lié à ce patient.' });
    }

    await prescriptionAct.update({
      Status: PrescriptionHealthcareactsStatus.PERFORMED,
    });

    const user = prescriptionAct.Prescription.Patient.User;
    console.log(prescriptionAct)

    return res.status(200).json({
      message: 'Soin validé avec succès.',
      healthcareAct: prescriptionAct.HealthcareAct?.Name,
      patientName: `${user.FirstName} ${user.LastName}`,
      validatedAt: new Date(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur interne serveur.' });
  }
});

export default router;
