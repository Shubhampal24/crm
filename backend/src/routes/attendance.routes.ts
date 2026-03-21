import { Router } from 'express';
import { markStudent, bulkMarkStudent, getStudentAttendance, staffCheckIn, staffCheckOut, getStaffAttendance } from '../controllers/attendance.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { markStudentAttendanceSchema, bulkMarkStudentAttendanceSchema, staffCheckInSchema, staffCheckOutSchema } from '../schemas/attendance.schema';

const router = Router();

router.use(authenticate);

router.post('/student/mark', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), validate(markStudentAttendanceSchema), markStudent);
router.post('/student/bulk', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), validate(bulkMarkStudentAttendanceSchema), bulkMarkStudent);
router.get('/student', authorize(['ADMIN', 'PRINCIPAL', 'STAFF', 'PARENT']), getStudentAttendance);

router.post('/staff/checkin', authorize(['STAFF']), validate(staffCheckInSchema), staffCheckIn);
router.post('/staff/checkout', authorize(['STAFF']), validate(staffCheckOutSchema), staffCheckOut);
router.get('/staff', authorize(['ADMIN', 'PRINCIPAL', 'STAFF']), getStaffAttendance);

export default router;
