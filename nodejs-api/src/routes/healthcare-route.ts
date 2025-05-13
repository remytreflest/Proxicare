import express from 'express';
import { HealthcareProfessionalHealthcareAct } from '../models/HealthcareProfessionalHealthcareAct';
import HealthcareProfessional from '../models/HealthcareProfessional';
import HealthcareAct from '../models/HealthcareAct';

const router = express.Router();

/**
 * Associe un professionnel de santé à un acte de soin
 * @route POST /healthcare/act
 * @body { HealthcareProfessionalId, HealthcareActId }
 */
router.post('/healthcare/act', async (req: any, res: any) => {
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

export default router;
