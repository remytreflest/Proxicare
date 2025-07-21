import express from 'express';
import HealthcareProfessionalHealthcareAct from '@/models/HealthcareProfessionalHealthcareAct';
import HealthcareProfessional from '@/models/HealthcareProfessional';
import HealthcareAct from '@/models/HealthcareAct';

const router = express.Router();

/**
 * @swagger
 * /healthcare/act/healthcareprofessional:
 *   post:
 *     summary: Associe un professionnel de santé à un acte
 *     tags: [Healthcare Acts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [healthcareActId]
 *             properties:
 *               healthcareActId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Association créée avec succès
 *       400:
 *         description: Données manquantes
 *       404:
 *         description: Professionnel ou acte introuvable
 *       500:
 *         description: Erreur serveur
 */
router.post('/healthcare/act/healthcareprofessional', async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { healthcareActId } = req.body;

    if (!userId || !healthcareActId) {
      return res.status(400).json({ message: 'L\'utilisateur et l\'ID de l\'acte sont requis.' });
    }

    const healthcareprofessional = await HealthcareProfessional.findOne({ where: { UserId: userId } });
    if (!healthcareprofessional) {
      return res.status(404).json({ message: 'Le professionnel de soins est introuvable.' });
    }

    const act = await HealthcareAct.findOne({ where: { Id: healthcareActId } });
    if (!act) {
      return res.status(404).json({ message: 'Acte de soin introuvable.' });
    }

    await HealthcareProfessionalHealthcareAct.create({
      HealthcareProfessionalId: healthcareprofessional.Id,
      HealthcareActId: healthcareActId,
    });

    return res.status(201).json({ message: 'Association créée avec succès.' });
  } catch (error) {
    console.error('Erreur association acte/soignant :', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * @swagger
 * /healthcare/act/healthcareprofessional/{actId}:
 *   delete:
 *     summary: Supprime l’association entre un professionnel et un acte
 *     tags: [Healthcare Acts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: actId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l’acte à dissocier
 *     responses:
 *       200:
 *         description: Acte supprimé avec succès
 *       400:
 *         description: Paramètre invalide
 *       404:
 *         description: Acte introuvable ou déjà supprimé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/healthcare/act/healthcareprofessional/:actId', async (req: any, res: any) => {
  const userId = req.userId;
  const actId = parseInt(req.params.actId);

  if (isNaN(actId)) {
    return res.status(400).json({ message: 'Paramètres invalides' });
  }

  try {
    const healthcareprofessional = await HealthcareProfessional.findOne({ where: { UserId: userId } });

    if (!healthcareprofessional) {
      return res.status(404).json({ message: 'Professionnel non trouvé.' });
    }

    const deleted = await HealthcareProfessionalHealthcareAct.destroy({
      where: {
        HealthcareProfessionalId: healthcareprofessional.Id,
        HealthcareActId: actId
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Acte introuvable ou déjà supprimé.' });
    }

    return res.status(200).json({ message: 'Acte supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur suppression acte soignant :', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * @swagger
 * /healthcare/act:
 *   post:
 *     summary: Crée un nouvel acte de soin
 *     tags: [Healthcare Acts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Acte de soin créé avec succès
 *       400:
 *         description: Champs requis manquants ou invalides
 *       409:
 *         description: Acte déjà existant
 *       500:
 *         description: Erreur serveur
 */
router.post('/healthcare/act', async (req: any, res: any) => {
  const { name, description, price } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Le champ "Name" est requis et doit être une chaîne non vide.' });
  }

  if (isNaN(price) || price <= 0) {
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
 * @swagger
 * /healthcare/acts:
 *   get:
 *     summary: Récupère tous les actes de soins disponibles
 *     tags: [Healthcare Acts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des actes de soins
 *       500:
 *         description: Erreur serveur
 */
router.get('/healthcare/acts', async (req: any, res: any) => {
  try {
    const acts = await HealthcareAct.findAll();
    return res.status(200).json(acts);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des actes de soins' });
  }
});

/**
 * @swagger
 * /healthcare/acts/user:
 *   get:
 *     summary: Récupère les actes associés à un professionnel
 *     tags: [Healthcare Acts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des actes liés au professionnel
 *       404:
 *         description: Professionnel non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/healthcare/acts/user', async (req: any, res: any) => {

  const userId = req.userId;

  try {
    const healthcareprofessional = await HealthcareProfessional.findOne({
      where: { UserId: userId },
      include: [HealthcareAct]
    });

    if (!healthcareprofessional) {
      return res.status(404).json({ message: 'Professionnel non trouvé.' });
    }

    return res.status(200).json(healthcareprofessional.HealthcareActs);
  } catch (error) {
    console.error('Erreur récupération actes utilisateur :', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
