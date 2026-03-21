import { Request, Response, NextFunction } from 'express';
import { ComplaintService } from '../services/complaint.service';
import { logAudit } from '../utils/audit';

export class ComplaintController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { subject, description } = req.body;
      const user = (req as any).user;
      const complaint = await ComplaintService.createComplaint(user.userId, subject, description);
      await logAudit(user.userId, 'CREATE_COMPLAINT', `Created complaint: ${subject}`);
      
      res.status(201).json({ success: true, data: complaint });
    } catch (e) { next(e); }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const complaints = await ComplaintService.getComplaints(user.userId, user.role);
      res.json({ success: true, data: complaints });
    } catch (e) { next(e); }
  }

  static async resolve(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = (req as any).user;
      const complaint = await ComplaintService.resolveComplaint(id);
      await logAudit(user.userId, 'RESOLVE_COMPLAINT', `Resolved complaint ID: ${id}`);
      res.json({ success: true, data: complaint });
    } catch (e) { next(e); }
  }
}
