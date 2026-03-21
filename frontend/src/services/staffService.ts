import api from './api';

export const staffService = {
  getStaff: async () => {
    const response = await api.get('/staff');
    return response.data.data;
  },
  createStaff: async (data: { email: string, password?: string }) => {
    const response = await api.post('/staff', data);
    return response.data.data;
  },
  assignSubjects: async (staffId: string, subjectIds: string[]) => {
    const response = await api.post(`/staff/${staffId}/subjects`, { subjectIds });
    return response.data.data;
  }
};
