import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

export const getStudentReport = async (req: Request, res: Response) => {
  const { startDate, endDate, classId } = req.query;

  const filters: any = {};
  if (startDate) filters.startDate = new Date(startDate as string);
  if (endDate) filters.endDate = new Date(endDate as string);
  if (classId) filters.classId = classId as string;

  const report = await ReportService.getStudentAttendanceReport(filters);
  res.status(200).json({ success: true, data: report });
};

export const getStaffReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  const filters: any = {};
  if (startDate) filters.startDate = new Date(startDate as string);
  if (endDate) filters.endDate = new Date(endDate as string);

  const report = await ReportService.getStaffAttendanceReport(filters);
  res.status(200).json({ success: true, data: report });
};
