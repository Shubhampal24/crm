import { Request, Response } from 'express';
import { TimetableService } from '../services/timetable.service';

export const createTimetable = async (req: Request, res: Response) => {
  try {
    const timetable = await TimetableService.createTimetable(req.body);
    res.status(201).json({ success: true, data: timetable });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getClassTimetable = async (req: Request, res: Response) => {
  const { id } = req.params; // Class ID
  const { sectionId } = req.query;

  const results = await TimetableService.getClassTimetable(id, sectionId as string | undefined);
  res.status(200).json({ success: true, data: results });
};

export const getTeacherTimetable = async (req: Request, res: Response) => {
  const { id } = req.params; // Teacher/Staff ID

  const results = await TimetableService.getTeacherTimetable(id);
  res.status(200).json({ success: true, data: results });
};
