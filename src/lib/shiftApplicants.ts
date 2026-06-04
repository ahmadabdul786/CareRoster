import { mockShiftApplicants } from '@/constants/mockShiftApplicants';
import type { ShiftApplicant } from '@/types/hospital';

export function getShiftApplicantsByShiftId(shiftId: string): ShiftApplicant[] {
  return mockShiftApplicants.filter((applicant) => applicant.shiftId === shiftId);
}

export function countPendingApplicants(applicants: ShiftApplicant[]): number {
  return applicants.filter((applicant) => applicant.status === 'pending').length;
}
