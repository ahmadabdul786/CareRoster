import * as z from 'zod';

export const createTimesheetSchema = z.object({
  totalHoursWorked: z
    .string()
    .min(1, 'Total hours worked is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid number of hours',
    }),
  notes: z.string().optional(),
});

export type CreateTimesheetFormData = z.infer<typeof createTimesheetSchema>;
