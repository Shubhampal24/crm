import prisma from '../db/prisma';

export class ReportService {
  static async getStudentAttendanceReport(filters: { startDate?: Date, endDate?: Date, classId?: string }) {
    const query: any = {};
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.gte = filters.startDate;
      if (filters.endDate) query.date.lte = filters.endDate;
    }
    if (filters.classId) query.classId = filters.classId;

    const attendances = await prisma.attendanceStudent.findMany({
      where: query,
      include: { class: { select: { name: true } } }
    });

    const summary: Record<string, any> = {};
    attendances.forEach(a => {
      const key = `${a.date.toISOString().split('T')[0]}_${a.classId}`;
      if (!summary[key]) {
        summary[key] = { date: a.date, class: a.class.name, present: 0, absent: 0, late: 0, total: 0 };
      }
      summary[key].total += 1;
      if (a.status === 'PRESENT') summary[key].present += 1;
      if (a.status === 'ABSENT') summary[key].absent += 1;
      if (a.status === 'LATE') summary[key].late += 1;
    });

    return Object.values(summary).map(item => ({
      ...item,
      presentPercentage: ((item.present / item.total) * 100).toFixed(2) + '%'
    }));
  }

  static async getStaffAttendanceReport(filters: { startDate?: Date, endDate?: Date }) {
    const query: any = {};
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.gte = filters.startDate;
      if (filters.endDate) query.date.lte = filters.endDate;
    }

    const attendances = await prisma.attendanceStaff.findMany({
      where: query
    });

    const summary: Record<string, any> = {};
    attendances.forEach(a => {
      const key = a.date.toISOString().split('T')[0];
      if (!summary[key]) {
        summary[key] = { date: a.date, present: 0, absent: 0, half_day: 0, total: 0 };
      }
      summary[key].total += 1;
      if (a.status === 'PRESENT') summary[key].present += 1;
      if (a.status === 'ABSENT') summary[key].absent += 1;
      if (a.status === 'HALF_DAY') summary[key].half_day += 1;
    });

    return Object.values(summary).map(item => ({
      ...item,
      presentPercentage: ((item.present / item.total) * 100).toFixed(2) + '%'
    }));
  }
}
