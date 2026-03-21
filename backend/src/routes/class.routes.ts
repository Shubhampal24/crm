import { Router } from 'express';
import { createClass, assignStudents, createSubjectAndAssignTeacher } from '../controllers/class.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createClassSchema, assignStudentsClassSchema, createSubjectSchema } from '../schemas/entities.schema';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'PRINCIPAL']), validate(createClassSchema), createClass);
router.post('/assign-students', authorize(['ADMIN', 'PRINCIPAL']), validate(assignStudentsClassSchema), assignStudents);
router.post('/subject', authorize(['ADMIN', 'PRINCIPAL']), validate(createSubjectSchema), createSubjectAndAssignTeacher);

export default router;
