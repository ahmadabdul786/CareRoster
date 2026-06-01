export interface Timesheet {
  id: number;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  hoursWorked: number;
  invoiceStatus: 'generated' | 'sent' | 'pending';
}

export const mockTimesheets: Timesheet[] = [
  {
    id: 1,
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'General Practitioner – Day Shift',
    location: 'City Health Clinic',
    hoursWorked: 8,
    invoiceStatus: 'generated',
  },
  {
    id: 2,
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Locum GP – Day Shift',
    location: 'Sunrise Medical Centre',
    hoursWorked: 7.5,
    invoiceStatus: 'generated',
  },
  {
    id: 3,
    date: '27',
    month: 'OCT',
    year: '26',
    title: 'Emergency Department – Night Shift',
    location: 'Royal Care Hospital',
    hoursWorked: 10,
    invoiceStatus: 'sent',
  },
];
