import type { CreateShiftFormData } from '@/schemas/createShift.schema';
import type { HospitalShiftRecord, ShiftStatus } from '@/types/hospital';
import { mockHospitalShifts } from '@/constants/mockHospitalShifts';

const STORAGE_KEY = 'locum-hero-hospital-shifts';

function formatTimeDisplay(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

function parseDateParts(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return {
    date: String(parsed.getDate()).padStart(2, '0'),
    month: monthNames[parsed.getMonth()],
    year: String(parsed.getFullYear()).slice(-2),
  };
}

function generateReference(): string {
  return `SH-${Date.now().toString(36).toUpperCase()}`;
}

export function createShiftRecordFromForm(
  data: CreateShiftFormData,
  status: ShiftStatus = 'draft'
): HospitalShiftRecord {
  const { date, month, year } = parseDateParts(data.date);
  const time = `${formatTimeDisplay(data.startTime)} – ${formatTimeDisplay(data.endTime)}`;

  return {
    id: crypto.randomUUID(),
    reference: generateReference(),
    date,
    month,
    year,
    title: data.shiftTitle,
    location: data.location,
    time,
    status,
    price: Number(data.payRate),
    formData: data,
  };
}

export function getStoredHospitalShifts(): HospitalShiftRecord[] {
  if (typeof window === 'undefined') {
    return mockHospitalShifts;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return mockHospitalShifts;
    }

    const parsed = JSON.parse(stored) as HospitalShiftRecord[];
    return parsed.length > 0 ? parsed : mockHospitalShifts;
  } catch {
    return mockHospitalShifts;
  }
}

export function saveHospitalShifts(shifts: HospitalShiftRecord[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(shifts));
}

export function upsertHospitalShift(shift: HospitalShiftRecord): HospitalShiftRecord[] {
  const shifts = getStoredHospitalShifts();
  const mockIds = new Set(mockHospitalShifts.map((item) => item.id));
  const userShifts = shifts.filter((item) => !mockIds.has(item.id));
  const nextShifts = [...mockHospitalShifts, ...userShifts.filter((item) => item.id !== shift.id), shift];

  saveHospitalShifts(nextShifts);
  return nextShifts;
}

export function getHospitalShiftById(id: string): HospitalShiftRecord | undefined {
  return getStoredHospitalShifts().find((shift) => shift.id === id);
}

export function updateHospitalShiftStatus(id: string, status: ShiftStatus): HospitalShiftRecord | undefined {
  const shifts = getStoredHospitalShifts();
  const shift = shifts.find((item) => item.id === id);

  if (!shift) {
    return undefined;
  }

  const updatedShift = { ...shift, status };
  upsertHospitalShift(updatedShift);
  return updatedShift;
}

export type ShiftFilterStatus = 'all' | ShiftStatus;

export function filterHospitalShifts(
  shifts: HospitalShiftRecord[],
  filter: ShiftFilterStatus
): HospitalShiftRecord[] {
  if (filter === 'all') {
    return shifts;
  }

  return shifts.filter((shift) => shift.status === filter);
}
