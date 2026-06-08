import type { CreateShiftFormData } from '@/schemas/createShift.schema';

export type ShiftStatus = 'draft' | 'published' | 'filled' | 'cancelled' | 'completed';

export interface HospitalShiftRecord {
  id: string;
  reference: string;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: ShiftStatus;
  price: number;
  description?: string;
  timezone?: string;
  formData?: CreateShiftFormData;
}

export interface ApplicantDocument {
  name: string;
  size: string;
}

export interface ShiftApplicant {
  id: string;
  shiftId: string;
  doctorName: string;
  speciality: string;
  experience: string;
  coverNote: string;
  status: ApplicationStatus;
  documents: ApplicantDocument[];
  avatarUrl?: string;
}

/** @deprecated Use HospitalShiftRecord for new hospital shift flows */
export interface HospitalShift {
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: 'published' | 'filled' | 'pending';
  price: number;
}

export interface DoctorApplicant {
  doctorName: string;
  speciality: string;
  experience: string;
  shift: string;
  status: 'accepted' | 'pending' | 'rejected';
}

export type ApplicationStatus = 'accepted' | 'pending' | 'rejected';
