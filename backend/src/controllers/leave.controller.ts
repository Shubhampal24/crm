import { Request, Response } from 'express';
import { LeaveService } from '../services/leave.service';
import { AuthRequest } from '../middleware/auth';
import { LeaveStatus } from '@prisma/client';

export const applyLeave = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const { userId, role } = req.user!;

    const leave = await LeaveService.applyLeave(userId, role, {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason
    });

    res.status(201).json({ success: true, data: leave });
  } catch (err: any) {
    res.status(403).json({ success: false, message: err.message });
  }
};

export const getLeaves = async (req: Request, res: Response) => {
  const { role, status } = req.query;
  const results = await LeaveService.getLeaves({
    role: role as any,
    status: status as LeaveStatus
  });
  
  res.status(200).json({ success: true, data: results });
};

export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await LeaveService.updateLeaveStatus(id, LeaveStatus.APPROVED);
    res.status(200).json({ success: true, data: leave });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const rejectLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await LeaveService.updateLeaveStatus(id, LeaveStatus.REJECTED);
    res.status(200).json({ success: true, data: leave });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};
