import express from 'express';
import User from '../models/User';
import Patient from '../models/Patient';
import { RoleEnum } from '../resources/emuns/RolesEnum';
import { SpecialityEnum } from '../resources/emuns/speciality';
import { HealthcareProfessional } from '../models';

const router = express.Router();

router.post('/register/user', async (req: any, res: any) => {
  try {
    const { id, firstName, lastName, email } = req.body;
    const role = RoleEnum.USER;

    if (!id || !firstName || !lastName || !email ) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existingUserId = await User.findOne({ where: { Id: id } });
    if (existingUserId) {
      return res.status(409).json({ error: 'Un utilisateur avec cet ID existe déjà' });
    }

    const existingUserEmail = await User.findOne({ where: { Email: email } });
    if (existingUserEmail) {
      return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const newUser = await User.create({
      Id: id,
      FirstName:firstName,
      LastName:lastName,
      Email: email,
      Role:role,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    return res.status(201).json(newUser);
  } 
  catch (error) 
  {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

router.post('/register/patient', async (req: any, res: any) => {
  try {
    // Récupération des informations nécessaires dans la requête
    const { userId, birthday, gender, address, socialSecurityNumber } = req.body;

    // Vérification des champs requis
    if (!userId || !birthday || !gender || !address || !socialSecurityNumber) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérification que l'utilisateur existe avant de l'associer au patient
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification que le numéro de sécurité sociale est unique
    const existingPatient = await Patient.findOne({ where: { SocialSecurityNumber:socialSecurityNumber } });
    if (existingPatient) {
      return res.status(409).json({ message: 'Un patient avec ce numéro de sécurité sociale existe déjà.' });
    }

    // Création du patient associé à l'utilisateur existant
    const newPatient = await Patient.create({
      UserId:userId,  // On associe l'userId déjà existant
      Birthday:birthday,
      Gender:gender,
      Address: address || '',  // Champ address est optionnel
      SocialSecurityNumber:socialSecurityNumber,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    return res.status(201).json({
      message: 'Patient enregistré avec succès.',
      patient: newPatient,
    });
  } 
  catch (error) 
  {
    console.error('Erreur lors de la création du patient:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Route pour afficher tous les utilisateurs
router.post('/register/caregiver', async (req: any, res: any ) => {
  try {
    // Récupération des informations nécessaires dans la requête
    const { userId, speciality } = req.body;
console.log(speciality)
    // Vérification des champs requis
    if (!userId || !speciality) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    if (!Object.values(SpecialityEnum).includes(speciality)) {
      return res.status(400).json({ message: 'Rôle invalide.' });
    }

    // Vérification que l'utilisateur existe avant de l'associer au patient
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const existingUserId = await HealthcareProfessional.findOne({ where: { UserId: userId } });
    if (existingUserId) {
      return res.status(409).json({ error: 'Un utilisateur avec cet ID existe déjà' });
    }

    const newCaregiver = await HealthcareProfessional.create({
      UserId:userId,  // On associe l'userId déjà existant
      Speciality:speciality,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    return res.status(201).json({
      message: 'Professionnel de soins enregistré avec succès.',
      patient: newCaregiver,
    });
  } 
  catch (error) 
  {
    console.error('Erreur lors de la création du professionnel de soins:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

export default router;
