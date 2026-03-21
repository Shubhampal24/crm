import prisma from '../db/prisma';
import { LeaveStatus, Role } from '@prisma/client';

export class LeaveService {
  static async applyLeave(userId: string, role: Role, data: { startDate: Date, endDate: Date, reason: string }) {
    if (!([Role.STAFF, Role.STUDENT] as Role[]).includes(role)) {
      throw new Error('Only Staff and Students can apply for leave');
    }

    return await prisma.leave.create({
      data: {
        userId,
        role,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        status: LeaveStatus.PENDING
      }
    });
  }

  static async getLeaves(filters?: { role?: Role, status?: LeaveStatus }) {
    const query: any = {};
    if (filters?.role) query.role = filters.role;
    if (filters?.status) query.status = filters.status;

    return await prisma.leave.findMany({
      where: query,
      include: {
        user: { select: { email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateLeaveStatus(id: string, status: LeaveStatus) {
    const existing = await prisma.leave.findUnique({ where: { id } });
    if (!existing) throw new Error('Leave application not found');

    return await prisma.leave.update({
      where: { id },
      data: { status }
    });
  }
}
