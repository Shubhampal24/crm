import { z } from 'zod';

export const createTimetableSchema = z.object({
  body: z.object({
    classId: z.string().uuid(),
    sectionId: z.string().uuid(),
    subjectId: z.string().uuid(),
    teacherId: z.string().uuid(),
    dayOfWeek: z.number().min(1).max(7),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Valid format HH:mm required'),
    endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Valid format HH:mm required')
  })
});
