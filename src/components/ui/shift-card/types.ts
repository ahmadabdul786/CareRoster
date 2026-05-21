export type HospitalVariantProps = {
  variant: 'hospital';
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: 'published' | 'filled' | 'pending';
  price: number;
  onViewDetails?: () => void;
  className?: string;
};

export type DoctorVariantProps = {
  variant: 'doctor';
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: 'accepted' | 'pending' | 'rejected' | 'withdrawn';
  onWithdraw?: () => void;
  className?: string;
};

export type MyShiftsVariantProps = {
  variant: 'my-shifts';
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  shiftType: 'past' | 'upcoming';
  timesheetCreated?: boolean;
  onCreateTimesheet?: () => void;
  onViewDetails?: () => void;
  className?: string;
};

export type ShiftCardProps = HospitalVariantProps | DoctorVariantProps | MyShiftsVariantProps;
