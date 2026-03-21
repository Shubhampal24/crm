import { Router } from 'express';
import { createStaff, assignSubjects, getStaffList } from '../controllers/staff.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createStaffSchema, assignSubjectSchema } from '../schemas/entities.schema';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'PRINCIPAL']), validate(createStaffSchema), createStaff);
router.get('/', authorize(['ADMIN', 'PRINCIPAL']), getStaffList);
router.post('/:id/subjects', authorize(['ADMIN', 'PRINCIPAL']), validate(assignSubjectSchema), assignSubjects);

export default router;
