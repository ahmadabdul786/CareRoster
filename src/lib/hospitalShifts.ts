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
    description: data.description,
    timezone: data.timezone,
    formData: data,
  };
}

function deduplicateById(shifts: HospitalShiftRecord[]): HospitalShiftRecord[] {
  const byId = new Map<string, HospitalShiftRecord>();
  for (const shift of shifts) {
    byId.set(shift.id, shift);
  }
  return Array.from(byId.values());
}

function mergeShiftWithMock(stored: HospitalShiftRecord, mock: HospitalShiftRecord): HospitalShiftRecord {
  return {
    ...mock,
    ...stored,
    description:
      stored.description ?? mock.description ?? stored.formData?.description ?? mock.formData?.description,
    timezone: stored.timezone ?? mock.timezone ?? stored.formData?.timezone ?? mock.formData?.timezone,
  };
}

function mergeWithDefaultMocks(shifts: HospitalShiftRecord[]): HospitalShiftRecord[] {
  const mockIds = new Set(mockHospitalShifts.map((item) => item.id));
  const mockById = new Map(mockHospitalShifts.map((mock) => [mock.id, mock]));
  const byId = new Map<string, HospitalShiftRecord>();

  for (const shift of deduplicateById(shifts)) {
    const mock = mockById.get(shift.id);
    byId.set(shift.id, mock ? mergeShiftWithMock(shift, mock) : shift);
  }

  for (const mock of mockHospitalShifts) {
    if (!byId.has(mock.id)) {
      byId.set(mock.id, mock);
    }
  }

  const uniqueNonMocks = Array.from(byId.values()).filter((shift) => !mockIds.has(shift.id));

  return [...mockHospitalShifts.map((mock) => byId.get(mock.id)!), ...uniqueNonMocks];
}

function normalizeStoredShifts(shifts: HospitalShiftRecord[]): HospitalShiftRecord[] {
  return mergeWithDefaultMocks(deduplicateById(shifts));
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
    if (parsed.length === 0) {
      return mockHospitalShifts;
    }

    const normalized = normalizeStoredShifts(parsed);
    const shouldPersist =
      normalized.length !== parsed.length ||
      JSON.stringify(normalized) !== JSON.stringify(parsed);
    if (shouldPersist) {
      saveHospitalShifts(normalized);
    }
    return normalized;
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
  const shifts = getStoredHospitalShifts().filter((item) => item.id !== shift.id);
  const nextShifts = normalizeStoredShifts([...shifts, shift]);

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
