import { Router } from 'express';
import { ComplaintController } from '../controllers/complaint.controller';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.post('/create', ComplaintController.create);
router.get('/', ComplaintController.get);
router.put('/resolve/:id', authorize([Role.ADMIN, Role.PRINCIPAL]), ComplaintController.resolve);

export default router;
