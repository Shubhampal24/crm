import { Router } from 'express';
import { applyLeave, getLeaves, approveLeave, rejectLeave } from '../controllers/leave.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { applyLeaveSchema } from '../schemas/leave.schema';

const router = Router();

router.use(authenticate);

router.post('/apply', authorize(['STAFF', 'STUDENT']), validate(applyLeaveSchema), applyLeave);
router.get('/', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), getLeaves);
router.put('/:id/approve', authorize(['ADMIN', 'PRINCIPAL']), approveLeave);
router.put('/:id/reject', authorize(['ADMIN', 'PRINCIPAL']), rejectLeave);

export default router;
