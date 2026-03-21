import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

// Only admins/principals can theoretically broadcast/send system notifications directly via API
router.post('/send', authorize([Role.ADMIN, Role.PRINCIPAL]), NotificationController.send);
router.get('/', NotificationController.get);
router.put('/:id/read', NotificationController.markRead);

export default router;
