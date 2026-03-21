import prisma from '../db/prisma';

export class TimetableService {
  static async createTimetable(data: { classId: string, sectionId: string, subjectId: string, teacherId: string, dayOfWeek: number, startTime: string, endTime: string }) {
    // Validate teacher availability
    const teacherConflict = await prisma.timetable.findFirst({
      where: {
        teacherId: data.teacherId,
        dayOfWeek: data.dayOfWeek,
        OR: [
          { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
          { startTime: { lt: data.endTime }, endTime: { gte: data.endTime } },
          { startTime: { gte: data.startTime }, endTime: { lte: data.endTime } }
        ]
      }
    });

    if (teacherConflict) throw new Error('Teacher has a conflicting class schedule');

    // Validate class overlap
    const classConflict = await prisma.timetable.findFirst({
      where: {
        classId: data.classId,
        sectionId: data.sectionId,
        dayOfWeek: data.dayOfWeek,
        OR: [
          { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
          { startTime: { lt: data.endTime }, endTime: { gte: data.endTime } },
          { startTime: { gte: data.startTime }, endTime: { lte: data.endTime } }
        ]
      }
    });

    if (classConflict) throw new Error('Class section already has a conflicting schedule');

    return await prisma.timetable.create({ data });
  }

  static async getClassTimetable(classId: string, sectionId?: string) {
    const query: any = { classId };
    if (sectionId) query.sectionId = sectionId;

    return await prisma.timetable.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        teacher: { include: { user: { select: { email: true } } } }
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    });
  }

  static async getTeacherTimetable(teacherId: string) {
    return await prisma.timetable.findMany({
      where: { teacherId },
      include: {
        class: { select: { name: true } },
        section: { select: { name: true } },
        subject: { select: { name: true } }
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    });
  }
}
