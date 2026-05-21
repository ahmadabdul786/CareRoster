import * as z from 'zod';

// Doctor Profile Schema
export const doctorProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  ahpraNumber: z.string().min(5, 'AHPRA number is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  location: z.string().min(2, 'Location is required'),
  preferredPayRate: z.string().optional(),
  profileBio: z.string().optional(),
  abn: z.string().min(11, 'ABN must be 11 digits').max(11, 'ABN must be 11 digits').optional(),
});

export type DoctorProfileFormData = z.infer<typeof doctorProfileSchema>;

// Hospital Profile Schema
export const hospitalProfileSchema = z.object({
  organisationName: z.string().min(2, 'Organisation name must be at least 2 characters'),
  abn: z.string().min(11, 'ABN must be 11 digits').max(11, 'ABN must be 11 digits'),
  contactPersonName: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(2, 'Location is required'),
  state: z.string().min(1, 'State is required'),
  organisationDescription: z.string().optional(),
  facilityType: z.string().min(1, 'Facility type is required'),
});

export type HospitalProfileFormData = z.infer<typeof hospitalProfileSchema>;
