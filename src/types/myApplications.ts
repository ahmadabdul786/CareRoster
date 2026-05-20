export type DoctorApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface DoctorApplication {
  id: number;
  title: string;
  hospitalName: string;
  date: string;
  month: string;
  year: string;
  time: string;
  status: DoctorApplicationStatus;
}
