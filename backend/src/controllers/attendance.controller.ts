import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendance.service';
import { AuthRequest } from '../middleware/auth';
import prisma from '../db/prisma';

export const markStudent = async (req: AuthRequest, res: Response) => {
  const { studentId, classId, date, status } = req.body;
  const markedBy = req.user!.userId;

  const attendance = await AttendanceService.markStudentAttendance({
    studentId, classId, date: new Date(date), status, markedBy
  });

  res.status(200).json({ success: true, data: attendance });
};

export const bulkMarkStudent = async (req: AuthRequest, res: Response) => {
  const { classId, date, attendances } = req.body;
  const markedBy = req.user!.userId;

  const results = await AttendanceService.bulkMarkStudentAttendance({
    classId, date: new Date(date), markedBy, attendances
  });

  res.status(200).json({ success: true, message: `${results.length} records processed`, data: results });
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  const { date, classId, studentId } = req.query;
  const filters: any = {};
  if (date) filters.date = new Date(date as string);
  if (classId) filters.classId = classId as string;
  if (studentId) filters.studentId = studentId as string;

  const results = await AttendanceService.getStudentAttendance(filters);
  res.status(200).json({ success: true, data: results });
};

export const staffCheckIn = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId; 
  const { date, checkInTime } = req.body;
  
  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff) return res.status(403).json({ success: false, message: 'Not a staff member' });

  try {
    const result = await AttendanceService.staffCheckIn(staff.id, new Date(date), new Date(checkInTime));
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const staffCheckOut = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { date, checkOutTime } = req.body;
  
  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff) return res.status(403).json({ success: false, message: 'Not a staff member' });

  try {
    const result = await AttendanceService.staffCheckOut(staff.id, new Date(date), new Date(checkOutTime));
    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getStaffAttendance = async (req: Request, res: Response) => {
  const { staffId, date } = req.query;
  const queryStaff = staffId as string | undefined;
  const queryDate = date ? new Date(date as string) : undefined;

  const results = await AttendanceService.getStaffAttendance(queryStaff, queryDate);
  res.status(200).json({ success: true, data: results });
};
