import { DoctorApplicant, HospitalShift } from '@/types/hospital';

export const mockHospitalDashboardActiveShifts: HospitalShift[] = [
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Emergency Medicine – Night Shift',
    location: 'Sydney, NSW',
    time: '08:00 PM – 08:00 AM',
    status: 'published',
    price: 180,
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'General Practice – Day Shift',
    location: 'Sydney, NSW',
    time: '08:00 PM – 08:00 AM',
    status: 'filled',
    price: 180,
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Emergency Medicine – Night Shift',
    location: 'Sydney, NSW',
    time: '08:00 PM – 08:00 AM',
    status: 'pending',
    price: 180,
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Emergency Medicine – Night Shift',
    location: 'Sydney, NSW',
    time: '08:00 PM – 08:00 AM',
    status: 'published',
    price: 180,
  },
];

export const mockHospitalDashboardRecentApplications: DoctorApplicant[] = [
  {
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'accepted',
  },
  {
    doctorName: 'Dr. Michael Tan',
    speciality: 'Anaesthetics',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'accepted',
  },
  {
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'pending',
  },
  {
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'accepted',
  },
  {
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'accepted',
  },
  {
    doctorName: 'Dr. James Wilson',
    speciality: 'Emergency Medicine',
    experience: 'Consultant',
    shift: 'Emergency Medicine – Night Shift',
    status: 'pending',
  },
];

export const hospitalDashboardActivityStats = [
  { label: 'Shifts Posted', value: 12, color: 'blue' as const },
  { label: 'Filled Shifts', value: 7, color: 'blue' as const },
  { label: 'Pending Shifts', value: 3, color: 'orange' as const },
];
