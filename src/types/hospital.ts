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

export interface DoctorApplication {
  doctorName: string;
  speciality: string;
  experience: string;
  shift: string;
  status: 'accepted' | 'pending' | 'rejected';
}

export type ShiftStatus = 'published' | 'filled' | 'pending';
export type ApplicationStatus = 'accepted' | 'pending' | 'rejected';
