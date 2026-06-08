import type { ShiftApplicant } from '@/types/hospital';

const defaultDocuments = [
  { name: 'Medical Degree Certificate', size: '120mb' },
  { name: 'Professional Indemnity Insurance', size: '145mb' },
];

const wilsonApplicants: ShiftApplicant[] = [
  {
    id: 'app-1',
    shiftId: 'mock-1',
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    coverNote:
      'I have extensive experience in emergency overnight shifts and am available for the full duration of this posting.',
    status: 'pending',
    documents: defaultDocuments,
    avatarUrl: '/assets/images/profile.jpg',
  },
  {
    id: 'app-2',
    shiftId: 'mock-1',
    doctorName: 'Dr. Sarah Chen',
    speciality: 'Emergency Medicine',
    experience: 'Senior Registrar',
    coverNote:
      'Previously worked at St. Mary\'s ED and familiar with hospital protocols. Happy to start immediately.',
    status: 'pending',
    documents: defaultDocuments,
    avatarUrl: '/assets/images/profile.jpg',
  },
  {
    id: 'app-3',
    shiftId: 'mock-1',
    doctorName: 'Dr. Michael Tan',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    coverNote:
      'Available for the night shift. I can provide full coverage including handover documentation.',
    status: 'pending',
    documents: defaultDocuments,
    avatarUrl: '/assets/images/profile.jpg',
  },
];

export const mockShiftApplicants: ShiftApplicant[] = [
  ...wilsonApplicants,
  {
    id: 'app-4',
    shiftId: 'mock-2',
    doctorName: 'Dr. Emily Roberts',
    speciality: 'General Practice',
    experience: 'GP',
    coverNote: 'Experienced in day clinic workflows and patient consultations.',
    status: 'accepted',
    documents: defaultDocuments,
    avatarUrl: '/assets/images/profile.jpg',
  },
  {
    id: 'app-5',
    shiftId: 'mock-4',
    doctorName: 'Dr. James Wilson',
    speciality: 'Anaesthetics',
    experience: 'Consultant',
    coverNote: 'Available for evening anaesthetics cover with full indemnity documentation.',
    status: 'pending',
    documents: defaultDocuments,
    avatarUrl: '/assets/images/profile.jpg',
  },
];
