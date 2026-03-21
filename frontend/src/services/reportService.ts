import api from './api';

export const reportService = {
  getStudentAttendanceReport: async (startDate: string, endDate: string, classId?: string) => {
    const params = new URLSearchParams({ startDate, endDate });
    if (classId) params.append('classId', classId);
    const response = await api.get(`/reports/student-attendance?${params.toString()}`);
    return response.data.data;
  },
  getStaffAttendanceReport: async (startDate: string, endDate: string) => {
    const params = new URLSearchParams({ startDate, endDate });
    const response = await api.get(`/reports/staff-attendance?${params.toString()}`);
    return response.data.data;
  }
};
