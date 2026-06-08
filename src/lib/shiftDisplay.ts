import type { HospitalShiftRecord } from '@/types/hospital';

const DEFAULT_DESCRIPTION =
  'Provide medical services as outlined in the shift posting, including patient assessment and treatment.';

export function getShiftDescription(shift: HospitalShiftRecord): string {
  return shift.description ?? shift.formData?.description ?? DEFAULT_DESCRIPTION;
}

export function getShiftTimezone(shift: HospitalShiftRecord): string {
  return shift.timezone ?? shift.formData?.timezone ?? 'AEST';
}

export function getShiftTimeDisplay(shift: HospitalShiftRecord): string {
  const timezone = getShiftTimezone(shift);
  if (shift.time.includes('Timezone')) {
    return shift.time;
  }
  return `${shift.time} (Timezone: ${timezone})`;
}
