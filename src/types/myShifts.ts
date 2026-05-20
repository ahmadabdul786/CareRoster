export type ShiftTab = 'past' | 'upcoming';

export interface MyShift {
  id: number;
  title: string;
  hospitalName: string;
  date: string;
  month: string;
  year: string;
  time: string;
  timesheetCreated: boolean;
  type: ShiftTab;
}
