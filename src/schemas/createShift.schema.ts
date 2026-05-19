import * as z from 'zod';

// Create Shift Schema
export const createShiftSchema = z.object({
  shiftTitle: z.string().min(5, 'Shift title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requiredSpecialty: z.string().min(1, 'Specialty is required'),
  requiredExperienceLevel: z.string().min(1, 'Experience level is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  location: z.string().min(2, 'Location is required'),
  state: z.string().min(1, 'State is required'),
  payRate: z.string().min(1, 'Pay rate is required'),
});

export type CreateShiftFormData = z.infer<typeof createShiftSchema>;
