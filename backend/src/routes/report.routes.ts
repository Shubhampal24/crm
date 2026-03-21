import { Router } from 'express';
import { getStudentReport, getStaffReport } from '../controllers/report.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/student-attendance', authorize(['ADMIN', 'PRINCIPAL']), getStudentReport);
router.get('/staff-attendance', authorize(['ADMIN', 'PRINCIPAL']), getStaffReport);

export default router;
