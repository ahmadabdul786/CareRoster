export interface DoctorShift {
  date: string;
  month: string;
  year: string;
  title: string;
  hospitalName: string;
  time: string;
  location: string;
}

export interface DoctorApplicationItem {
  title: string;
  hospitalName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface DoctorApplication {
  id: number;
  title: string;
  hospitalName: string;
  date: string;
  month: string;
  year: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

export type DoctorApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';
