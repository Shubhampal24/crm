import api from './api';

export const timetableService = {
  getClassTimetable: async (classId: string) => {
    const response = await api.get(`/timetable/class/${classId}`);
    return response.data.data;
  },
  getTeacherTimetable: async (teacherId: string) => {
    const response = await api.get(`/timetable/teacher/${teacherId}`);
    return response.data.data;
  },
  createTimetable: async (data: any) => {
    const response = await api.post('/timetable/create', data);
    return response.data.data;
  }
};
