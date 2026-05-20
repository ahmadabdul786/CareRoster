'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { ShiftCard } from '@/components/ui/shift-card';
import { DoctorApplication } from '@/types/doctor';

const mockApplications: DoctorApplication[] = [
  {
    id: 1,
    title: 'General Practitioner – Morning Shift',
    hospitalName: "St. Mary's Hospital Sydney, NSW",
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Emergency Department – Night Shift',
    hospitalName: 'Royal Care Hospital',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 PM – 06:00 AM',
    status: 'accepted',
  },
  {
    id: 3,
    title: 'Locum GP – Day Shift',
    hospitalName: 'Sunrise Medical Centre',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'rejected',
  },
  {
    id: 4,
    title: 'GP – Weekend Shift',
    hospitalName: 'Harbour Health Clinic',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'withdrawn',
  },
  {
    id: 5,
    title: 'General Practitioner – Morning Shift',
    hospitalName: "St. Mary's Hospital Sydney, NSW",
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Emergency Department – Night Shift',
    hospitalName: 'Royal Care Hospital',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 PM – 06:00 AM',
    status: 'accepted',
  },
  {
    id: 7,
    title: 'Locum GP – Day Shift',
    hospitalName: 'Sunrise Medical Centre',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'rejected',
  },
  {
    id: 8,
    title: 'GP – Weekend Shift',
    hospitalName: 'Harbour Health Clinic',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'withdrawn',
  },
  {
    id: 9,
    title: 'General Practitioner – Morning Shift',
    hospitalName: "St. Mary's Hospital Sydney, NSW",
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 AM – 02:00 PM',
    status: 'pending',
  },
  {
    id: 10,
    title: 'Emergency Department – Night Shift',
    hospitalName: 'Royal Care Hospital',
    date: '27',
    month: 'OCT',
    year: '26',
    time: '08:00 PM – 06:00 AM',
    status: 'accepted',
  },
];

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<DoctorApplication[]>(mockApplications);

  const handleWithdraw = (id: number) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'withdrawn' as const } : app))
    );
  };

  return (
    <DashboardLayout role="doctor">
      <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1 text-[32px]">
              My Applications
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
              Track the status of your submitted shift applications
            </Typography>
          </div>
          <Link href="/doctor/browse-shifts" className="shrink-0">
            <Button variant="outline" size="default">
              Browse Shifts
            </Button>
          </Link>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
          {applications.map((application) => (
            <ShiftCard
              key={application.id}
              variant="doctor"
              date={application.date}
              month={application.month}
              year={application.year}
              title={application.title}
              location={application.hospitalName}
              time={application.time}
              status={application.status}
              onWithdraw={() => handleWithdraw(application.id)}
            />

          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
