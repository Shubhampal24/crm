import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import staffRoutes from './routes/staff.routes';
import parentRoutes from './routes/parent.routes';
import classRoutes from './routes/class.routes';

import attendanceRoutes from './routes/attendance.routes';
import reportRoutes from './routes/report.routes';
import timetableRoutes from './routes/timetable.routes';
import leaveRoutes from './routes/leave.routes';
import complaintRoutes from './routes/complaint.routes';
import notificationRoutes from './routes/notification.routes';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Week 1 Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/classes', classRoutes);

// Week 2 Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/leave', leaveRoutes);

// Week 4 Routes
app.use('/api/complaint', complaintRoutes);
app.use('/api/notifications', notificationRoutes);
// Central error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  if (err.name === 'ZodError') {
    return res.status(400).json({ success: false, message: 'Validation error', errors: (err as any).errors });
  }
  
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
