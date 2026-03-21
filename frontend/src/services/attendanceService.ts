import api from './api';

export const attendanceService = {
  getStudentAttendance: async (date: string, classId?: string) => {
    const params = new URLSearchParams({ date });
    if (classId) params.append('classId', classId);
    const response = await api.get(`/attendance/student?${params.toString()}`);
    return response.data.data;
  },
  bulkMarkStudent: async (classId: string, date: string, attendances: { studentId: string, status: string }[]) => {
    const response = await api.post('/attendance/student/bulk', {
      classId, date, attendances
    });
    return response.data;
  }
};
