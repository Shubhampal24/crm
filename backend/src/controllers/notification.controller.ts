import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';
import { logAudit } from '../utils/audit';

export class NotificationController {
  static async send(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, message, type } = req.body;
      const user = (req as any).user;
      const notification = await NotificationService.sendNotification(userId, message, type);
      await logAudit(user.userId, 'SEND_NOTIFICATION', `Sent notification to User ID: ${userId}`);
      
      res.status(201).json({ success: true, data: notification });
    } catch (e) { next(e); }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const notifications = await NotificationService.getNotifications(user.userId);
      res.json({ success: true, data: notifications });
    } catch (e) { next(e); }
  }

  static async markRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.markAsRead(id);
      res.json({ success: true, data: notification });
    } catch (e) { next(e); }
  }
}
