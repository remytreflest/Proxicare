import { Router } from 'express';
import qrcodeRoutes from '../qrcodeController';
import registerRoutes from '../registerController';
import healthcareRoutes from '../healthcareController';
import appointmentRoutes from '../appointmentController';

const router = Router();

router.use(registerRoutes);
router.use(healthcareRoutes);
router.use(appointmentRoutes);
router.use(qrcodeRoutes);

export default router;