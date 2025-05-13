import { Router } from 'express';
import qrcodeRoutes from '../qrcode-route';
import registerRoutes from '../registerController';
import healthcareRoutes from '../healthcare-route';
import appointmentRoutes from '../appointment-route';

const router = Router();

router.use(registerRoutes);
router.use(healthcareRoutes);
router.use(appointmentRoutes);
router.use(qrcodeRoutes);

export default router;