import { Router } from 'express';
import qrcodeRoutes from './qrcode-route';
import usersRoutes from './users-route';

const router = Router();

router.use(qrcodeRoutes);
router.use(usersRoutes);

export default router;