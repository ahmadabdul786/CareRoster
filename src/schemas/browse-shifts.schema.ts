import { z } from 'zod';

export const browseShiftsFilterSchema = z.object({
  location: z.string().optional(),
  citySearch: z.string().optional(),
  specialty: z.string().optional(),
  experienceLevel: z.array(z.string()).default([]),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minPayRate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Number(val)),
      { message: 'Min pay rate must be a valid number' }
    ),
  maxPayRate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Number(val)),
      { message: 'Max pay rate must be a valid number' }
    ),
}).refine(
  (data) => {
    if (data.minPayRate && data.maxPayRate) {
      return Number(data.minPayRate) <= Number(data.maxPayRate);
    }
    return true;
  },
  {
    message: 'Min pay rate must be less than or equal to max pay rate',
    path: ['maxPayRate'],
  }
).refine(
  (data) => {
    if (data.dateFrom && data.dateTo) {
      return new Date(data.dateFrom) <= new Date(data.dateTo);
    }
    return true;
  },
  {
    message: 'Start date must be before or equal to end date',
    path: ['dateTo'],
  }
);

export type BrowseShiftsFilterFormData = z.input<typeof browseShiftsFilterSchema>;
