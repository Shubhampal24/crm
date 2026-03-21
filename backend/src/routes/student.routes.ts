import { Router } from 'express';
import { createStudent, getStudents, updateStudent, deleteStudent } from '../controllers/student.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createStudentSchema, updateStudentSchema } from '../schemas/entities.schema';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'PRINCIPAL']), validate(createStudentSchema), createStudent);
router.get('/', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), getStudents);
router.patch('/:id', authorize(['ADMIN', 'PRINCIPAL']), validate(updateStudentSchema), updateStudent);
router.delete('/:id', authorize(['ADMIN']), deleteStudent);

export default router;
