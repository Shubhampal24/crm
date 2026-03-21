import prisma from '../db/prisma';
import { AttendanceStatus } from '@prisma/client';

export class AttendanceService {
  static async markStudentAttendance(data: { studentId: string, classId: string, date: Date, status: AttendanceStatus, markedBy: string }) {
    const existing = await prisma.attendanceStudent.findUnique({
      where: {
        studentId_date: { studentId: data.studentId, date: data.date }
      }
    });

    if (existing) {
      return await prisma.attendanceStudent.update({
        where: { id: existing.id },
        data: { status: data.status, markedBy: data.markedBy }
      });
    }

    return await prisma.attendanceStudent.create({ data });
  }

  static async bulkMarkStudentAttendance(data: { classId: string, date: Date, markedBy: string, attendances: { studentId: string, status?: AttendanceStatus }[] }) {
    const operations = data.attendances.map(a => {
      const status = a.status || AttendanceStatus.PRESENT;
      return prisma.attendanceStudent.upsert({
        where: {
          studentId_date: { studentId: a.studentId, date: data.date }
        },
        update: { status, markedBy: data.markedBy },
        create: {
          studentId: a.studentId,
          classId: data.classId,
          date: data.date,
          status,
          markedBy: data.markedBy
        }
      });
    });

    return await prisma.$transaction(operations);
  }

  static async getStudentAttendance(filters: { date?: Date, classId?: string, studentId?: string }) {
    const query: any = {};
    if (filters.date) query.date = filters.date;
    if (filters.classId) query.classId = filters.classId;
    if (filters.studentId) query.studentId = filters.studentId;

    return await prisma.attendanceStudent.findMany({
      where: query,
      include: { student: { select: { id: true, userId: true } } }
    });
  }

  static async staffCheckIn(staffId: string, date: Date, checkIn: Date) {
    const existing = await prisma.attendanceStaff.findUnique({
      where: { staffId_date: { staffId, date } }
    });

    if (existing) {
      if (existing.checkIn) throw new Error('Already checked in for today');
      return await prisma.attendanceStaff.update({
        where: { id: existing.id },
        data: { checkIn, status: AttendanceStatus.PRESENT }
      });
    }

    return await prisma.attendanceStaff.create({
      data: { staffId, date, checkIn, status: AttendanceStatus.PRESENT }
    });
  }

  static async staffCheckOut(staffId: string, date: Date, checkOut: Date) {
    const existing = await prisma.attendanceStaff.findUnique({
      where: { staffId_date: { staffId, date } }
    });

    if (!existing || !existing.checkIn) {
      throw new Error('Must check in before checking out');
    }

    return await prisma.attendanceStaff.update({
      where: { id: existing.id },
      data: { checkOut }
    });
  }

  static async getStaffAttendance(staffId?: string, date?: Date) {
    const query: any = {};
    if (staffId) query.staffId = staffId;
    if (date) query.date = date;

    return await prisma.attendanceStaff.findMany({
      where: query
    });
  }
}
