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
