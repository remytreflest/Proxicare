import express from 'express';
import { User } from '@/models/User';
import Patient from '@/models/Patient';
import { RolesEnum } from '@/resources/emuns/rolesEnum';
import { SpecialityEnum } from '@/resources/emuns/speciality';
import HealthcareProfessional from '@/models/HealthcareProfessional';
import { joinRoles } from '@/helpers/controllers/registerHelper';
import { addUserRole } from '@/resources/helpers/userHelper';
import { Structure } from '@/models/Structure';

const router = express.Router();

/**
 * @swagger
 * /register/user:
 *   get:
 *     summary: Récupère un utilisateur connecté par son GUID
 *     tags: [Register]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get('/user', async (req: any, res: any) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: Patient, include: [Structure] },
        {
          model: HealthcareProfessional,
          include: [{ model: Structure, through: { attributes: [] } }],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Register]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Champs requis manquants
 *       409:
 *         description: Conflit (ID ou email déjà utilisé)
 *       500:
 *         description: Erreur serveur
 */
router.post('/register/user', async (req: any, res: any) => {
  try {
    const auth0Id = req.userId;
    const { firstName, lastName, email } = req.body;
    const roles: RolesEnum[] = [RolesEnum.USER];

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUserId = await User.findOne({ where: { Id: auth0Id } });
    if (existingUserId) {
      return res.status(409).json({ error: 'Un utilisateur avec cet ID existe déjà' });
    }

    const existingUserEmail = await User.findOne({ where: { Email: email } });
    if (existingUserEmail) {
      return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const newUser = await User.create({
      Id: auth0Id,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Roles: joinRoles(roles),
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

/**
 * @swagger
 * /register/patient:
 *   post:
 *     summary: Enregistre un nouveau patient
 *     tags: [Register]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [birthday, gender, address, socialSecurityNumber, structureId]
 *             properties:
 *               birthday:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               socialSecurityNumber:
 *                 type: string
 *               structureId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Patient enregistré avec succès
 *       400:
 *         description: Données invalides ou manquantes
 *       404:
 *         description: Utilisateur non trouvé
 *       409:
 *         description: Numéro de sécu déjà enregistré
 *       500:
 *         description: Erreur serveur
 */
router.post('/register/patient', async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { birthday, gender, address, socialSecurityNumber, structureId } = req.body;

    if (!birthday || !gender || !address || !socialSecurityNumber || isNaN(structureId) || structureId <= 0) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const existingPatient = await Patient.findOne({ where: { SocialSecurityNumber: socialSecurityNumber } });
    if (existingPatient) {
      return res.status(409).json({ message: 'Un patient avec ce numéro de sécurité sociale existe déjà.' });
    }

    const newPatient = await Patient.create({
      UserId: userId,
      Birthday: birthday,
      Gender: gender,
      Address: address || '',
      SocialSecurityNumber: socialSecurityNumber,
      StructureId: structureId,
    });

    addUserRole(existingUser, RolesEnum.PATIENT);

    return res.status(201).json({
      message: 'Patient enregistré avec succès.',
      patient: newPatient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

/**
 * @swagger
 * /register/healthcareprofessional:
 *   post:
 *     summary: Enregistre un professionnel de santé
 *     tags: [Register]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [speciality, structureId, idn]
 *             properties:
 *               speciality:
 *                 type: string
 *               structureId:
 *                 type: integer
 *               idn:
 *                 type: string
 *     responses:
 *       201:
 *         description: Professionnel enregistré
 *       400:
 *         description: Champs manquants ou spécialité invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       409:
 *         description: Doublon utilisateur
 *       500:
 *         description: Erreur serveur
 */
router.post('/register/healthcareprofessional', async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { speciality, structureId, idn } = req.body;

    if (!speciality || structureId <= 0 || !idn) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    if (!Object.values(SpecialityEnum).includes(speciality)) {
      return res.status(400).json({ message: 'Rôle invalide.' });
    }

    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const existingHealthcareProfessional = await HealthcareProfessional.findOne({ where: { UserId: userId } });
    if (existingHealthcareProfessional) {
      return res.status(409).json({ error: 'Un utilisateur avec cet ID existe déjà' });
    }

    const newHealthcareProfessional = await HealthcareProfessional.create({
      UserId: userId,
      Speciality: speciality,
      StructureId: structureId,
      IDN: idn,
    });

    await newHealthcareProfessional.addStructure(structureId);
    addUserRole(existingUser, RolesEnum.HEALTHCAREPROFESSIONAL);

    return res.status(201).json({
      message: 'Professionnel de soins enregistré avec succès.',
      patient: newHealthcareProfessional,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

export default router;
