import express from 'express';
import { Structure } from '@/models/Structure';

const router = express.Router();

/**
 * @swagger
 * /structures:
 *   get:
 *     summary: Retourne toutes les structures médicales
 *     tags: [Structures]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des structures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Structure'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/structures', async (req: any, res: any) => {
  try {
    const structures = await Structure.findAll();
    res.status(200).json(structures);
  } catch (error) {
    console.error('Erreur récupération des structures :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

export default router;