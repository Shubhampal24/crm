import { Router } from 'express';
import { createTimetable, getClassTimetable, getTeacherTimetable } from '../controllers/timetable.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTimetableSchema } from '../schemas/timetable.schema';

const router = Router();

router.use(authenticate);

router.post('/create', authorize(['ADMIN', 'PRINCIPAL']), validate(createTimetableSchema), createTimetable);
router.get('/class/:id', authorize(['ADMIN', 'PRINCIPAL', 'STAFF', 'PARENT', 'STUDENT']), getClassTimetable);
router.get('/teacher/:id', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), getTeacherTimetable);

export default router;
