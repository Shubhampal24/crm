import { z } from 'zod';
import { AttendanceStatus } from '@prisma/client';

export const markStudentAttendanceSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    classId: z.string().uuid(),
    date: z.string().datetime(), // or date formats like YYYY-MM-DD that can be parsed
    status: z.nativeEnum(AttendanceStatus)
  })
});

export const bulkMarkStudentAttendanceSchema = z.object({
  body: z.object({
    classId: z.string().uuid(),
    date: z.string().datetime(),
    attendances: z.array(z.object({
      studentId: z.string().uuid(),
      status: z.nativeEnum(AttendanceStatus).optional() // default to PRESENT
    }))
  })
});

export const staffCheckInSchema = z.object({
  body: z.object({
    date: z.string().datetime(),
    checkInTime: z.string().datetime()
  })
});

export const staffCheckOutSchema = z.object({
  body: z.object({
    date: z.string().datetime(),
    checkOutTime: z.string().datetime()
  })
});
