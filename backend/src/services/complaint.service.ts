import prisma from '../db/prisma';

export class ComplaintService {
  static async createComplaint(userId: string, subject: string, description: string) {
    return prisma.complaint.create({
      data: { userId, subject, description }
    });
  }

  static async getComplaints(userId?: string, role?: string) {
    if (role === 'ADMIN' || role === 'PRINCIPAL') {
      return prisma.complaint.findMany({ include: { user: { select: { email: true } } }, orderBy: { createdAt: 'desc' } });
    }
    return prisma.complaint.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  static async resolveComplaint(id: string) {
    return prisma.complaint.update({
      where: { id },
      data: { status: 'RESOLVED' }
    });
  }
}
