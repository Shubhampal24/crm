import { z } from 'zod';

export const applyLeaveSchema = z.object({
  body: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    reason: z.string().min(5)
  })
});
