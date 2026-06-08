import { DoctorApplicationItem, DoctorShift } from '@/types/doctor';

export const mockDoctorDashboardUpcomingShifts: DoctorShift[] = [
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'General Practitioner – Morning Shift',
    hospitalName: "St. Mary's Hospital",
    time: '08:00 AM – 02:00 PM',
    location: 'Sydney, NSW',
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Emergency Department – Night Shift',
    hospitalName: 'Westside Medical Centre',
    time: '08:00 PM – 06:00 AM',
    location: 'Melbourne, VIC',
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Locum GP – Weekend Cover',
    hospitalName: 'Green Valley Clinic',
    time: '09:00 AM – 05:00 PM',
    location: 'Brisbane, QLD',
  },
  {
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'General Practitioner – Morning Shift',
    hospitalName: "St. Mary's Hospital",
    time: '08:00 AM – 02:00 PM',
    location: 'Sydney, NSW',
  },
];

export const mockDoctorDashboardRecentApplications: DoctorApplicationItem[] = [
  {
    title: 'General Practitioner – Evening Shift',
    hospitalName: 'City Health Clinic',
    status: 'pending',
  },
  {
    title: 'Emergency Doctor – Night Shift',
    hospitalName: 'Royal Care Hospital',
    status: 'accepted',
  },
  {
    title: 'Locum GP – Day Shift',
    hospitalName: 'Sunrise Medical Centre',
    status: 'rejected',
  },
  {
    title: 'General Practitioner – Evening Shift',
    hospitalName: 'City Health Clinic',
    status: 'pending',
  },
  {
    title: 'General Practitioner – Evening Shift',
    hospitalName: 'City Health Clinic',
    status: 'pending',
  },
];

export const doctorDashboardActivityStats = [
  { label: 'Applied Shifts', value: 12, color: 'blue' as const },
  { label: 'Accepted Shifts', value: 5, color: 'blue' as const },
  { label: 'Completed Shifts', value: 8, color: 'green' as const },
];
