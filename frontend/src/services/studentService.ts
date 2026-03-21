import api from './api';

export interface StudentData {
  email: string;
  password?: string;
  schoolId?: string;
  sectionId?: string;
  parentId?: string;
}

export const studentService = {
  getStudents: async () => {
    const response = await api.get('/students');
    return response.data.data;
  },
  createStudent: async (data: StudentData) => {
    const response = await api.post('/students', data);
    return response.data.data;
  },
  updateStudent: async (id: string, data: Partial<StudentData>) => {
    const response = await api.patch(`/students/${id}`, data);
    return response.data.data;
  },
  deleteStudent: async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data.success;
  }
};
