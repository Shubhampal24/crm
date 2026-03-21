import { z } from 'zod';

export const createStudentSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    schoolId: z.string().uuid().optional(),
    sectionId: z.string().uuid().optional(),
    parentId: z.string().uuid().optional()
  })
});

export const updateStudentSchema = z.object({
  body: z.object({
    sectionId: z.string().uuid().optional(),
    parentId: z.string().uuid().optional()
  })
});

export const createStaffSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    schoolId: z.string().uuid().optional()
  })
});

export const assignSubjectSchema = z.object({
  body: z.object({
    subjectIds: z.array(z.string().uuid())
  })
});

export const createParentSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    schoolId: z.string().uuid().optional()
  })
});

export const linkChildSchema = z.object({
  body: z.object({
    studentId: z.string().uuid()
  })
});

export const createClassSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    schoolId: z.string().uuid()
  })
});

export const assignStudentsClassSchema = z.object({
  body: z.object({
    studentIds: z.array(z.string().uuid()),
    sectionId: z.string().uuid()
  })
});

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    sectionId: z.string().uuid(),
    staffId: z.string().uuid().optional()
  })
});
