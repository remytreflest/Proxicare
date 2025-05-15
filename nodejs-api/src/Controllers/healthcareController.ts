import express from 'express';
import { HealthcareProfessionalHealthcareAct } from '../models/HealthcareProfessionalHealthcareAct';
import HealthcareProfessional from '../models/HealthcareProfessional';
import HealthcareAct from '../models/HealthcareAct';

const router = express.Router();

/**
 * Associe un professionnel de santé à un acte de soin
 * @route POST /healthcare/act
 * @body { 
 *  HealthcareProfessionalId, 
 *  HealthcareActId 
 * }
 */
router.post('/healthcare/act/caregiver', async (req: any, res: any) => {
    const { healthcareProfessionalId, healthcareActId } = req.body;

    if (!healthcareProfessionalId || !healthcareActId) {
        return res.status(400).json({ message: 'HealthcareProfessionalId et HealthcareActId sont requis.' });
    }

    const existinghealthcareProfessionalId = await HealthcareProfessional.findOne({ where: { Id: healthcareProfessionalId } });
    if (!existinghealthcareProfessionalId) {
        return res.status(404).json({ error: 'Le professionnel de soins n\'a pas été trouvé' });
    }

    const existinghealthcareActId = await HealthcareAct.findOne({ where: { Id: healthcareProfessionalId } });
    if (!existinghealthcareActId) {
        return res.status(404).json({ error: 'L\'acte n\'a pas été trouvé' });
    }

    try {
        await HealthcareProfessionalHealthcareAct.create({
            HealthcareProfessionalId: healthcareProfessionalId,
            HealthcareActId: healthcareActId,
        });

        res.status(201).json({ message: 'Association créée avec succès.' });
    } 
    catch (error) 
    {
        console.error('Erreur lors de la création de l\'association :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

/**
 * @route POST /healthcare/act
 * @description Crée un nouvel acte de soin
 * @access Public
 * 
 * @body
 * - Name: string (requis) — nom unique de l'acte
 * - Description: string (requis)
 * - Price: number (requis) — tarif de l’acte
 * 
 * @returns
 * - 201 : Acte créé avec succès
 * - 400 : Champs requis manquants ou invalides
 * - 409 : Un acte avec ce nom existe déjà
 * - 500 : Erreur interne du serveur
 */
router.post('/healthcare/act', async (req: any, res: any) => {
  const { name, description, price } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Le champ "Name" est requis et doit être une chaîne non vide.' });
  }

  if (isNaN(price) || price < 0) {
    return res.status(400).json({ message: 'Le champ "Price" est requis et doit être un nombre positif.' });
  }

  try {
    const existing = await HealthcareAct.findOne({ where: { Name: name } });
    if (existing) {
      return res.status(409).json({ message: 'Un acte avec ce nom existe déjà.' });
    }

    const newAct = await HealthcareAct.create({
      Name: name.trim(),
      Description: description?.trim() || null,
      Price: price,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    return res.status(201).json({
      message: 'Acte de soin créé avec succès.',
      act: newAct,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

/**
 * @route GET /healthcare/acts
 * @description Récupère tous les actes de soins disponibles
 * @access Public
 * 
 * @returns
 * - 200 : Liste des actes de soins
 * - 500 : Erreur serveur
 */
router.get('/healthcare/acts', async (req: any, res: any) => {
  try {
    const acts = await HealthcareAct.findAll();
    return res.status(200).json(acts);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des actes de soins' });
  }
});

export default router;
