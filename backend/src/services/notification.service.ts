import prisma from '../db/prisma';

export class NotificationService {
  static async sendNotification(userId: string, message: string, type: string) {
    return prisma.notification.create({
      data: { userId, message, type }
    });
  }

  static async getNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { readStatus: true }
    });
  }
}
