import { Router } from 'express';
import qrcodeRoutes from './qrcode-route';
import registerRoutes from './registration-route';

const router = Router();

router.use(registerRoutes);
router.use(qrcodeRoutes);

export default router;