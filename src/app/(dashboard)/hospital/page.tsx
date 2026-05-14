'use client';

import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { ActivityCard } from '@/components/ui/activity-card';
import { HospitalShiftCard } from '@/components/ui/hospital-shift-card';
import { ApplicationsTable } from '@/components/ui/applications-table';
import { Button } from '@/components/shared/button';
import { HospitalShift, DoctorApplication } from '@/types/hospital';

export default function HospitalDashboardPage() {
  const activeShifts: HospitalShift[] = [
    {
      date: '27',
      month: 'OCT',
      year: '26',
      title: 'Emergency Medicine – Night Shift',
      location: 'Sydney, NSW',
      time: '08:00 PM – 08:00 AM',
      status: 'published' as const,
      price: 180,
    },
    {
      date: '27',
      month: 'OCT',
      year: '26',
      title: 'General Practice – Day Shift',
      location: 'Sydney, NSW',
      time: '08:00 PM – 08:00 AM',
      status: 'filled' as const,
      price: 180,
    },
    {
      date: '27',
      month: 'OCT',
      year: '26',
      title: 'Emergency Medicine – Night Shift',
      location: 'Sydney, NSW',
      time: '08:00 PM – 08:00 AM',
      status: 'pending' as const,
      price: 180,
    },
    {
      date: '27',
      month: 'OCT',
      year: '26',
      title: 'Emergency Medicine – Night Shift',
      location: 'Sydney, NSW',
      time: '08:00 PM – 08:00 AM',
      status: 'published' as const,
      price: 180,
    },
  ];

  const recentApplications: DoctorApplication[] = [
    {
      doctorName: 'Dr. James Wilson',
      speciality: 'Emergency Medicine',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'accepted' as const,
    },
    {
      doctorName: 'Dr. Michael Tan',
      speciality: 'Anaesthetics',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'accepted' as const,
    },
    {
      doctorName: 'Dr. James Wilson',
      speciality: 'Emergency Medicine',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'pending' as const,
    },
    {
      doctorName: 'Dr. James Wilson',
      speciality: 'Emergency Medicine',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'accepted' as const,
    },
    {
      doctorName: 'Dr. James Wilson',
      speciality: 'Emergency Medicine',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'accepted' as const,
    },
    {
      doctorName: 'Dr. James Wilson',
      speciality: 'Emergency Medicine',
      experience: 'Consultant',
      shift: 'Emergency Medicine – Night Shift',
      status: 'pending' as const,
    },
  ];

  return (
    <DashboardLayout role="hospital">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Welcome Header */}
        <div className="mb-4 sm:mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2 text-xl sm:text-2xl lg:text-3xl">
            Dashboard
          </Typography>
          <Typography as="p" size="lg" weight="normal" className="text-secondary-gray text-sm sm:text-base">
            Active shifts summary, recent applications, quick stats
          </Typography>
        </div>

        {/* Activity Section */}
        <div>
          <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray mb-3 sm:mb-4 text-base sm:text-lg">
            Your Activity
          </Typography>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <ActivityCard
              icon="ph:note-pencil"
              label="Shifts Posted"
              value={12}
              color="blue"
            />
            <ActivityCard
              icon="ph:file-text"
              label="Filled Shifts"
              value={7}
              color="blue"
            />
            <ActivityCard
              icon="ph:tag-simple"
              label="Pending Shifts"
              value={3}
              color="orange"
            />
          </div>
        </div>

        {/* Active Shifts Section */}
        <div>
          <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray mb-3 sm:mb-4 text-base sm:text-lg">
            Active Shifts
          </Typography>

          {/* Shifts Grid - Responsive columns */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {activeShifts.map((shift, index) => (
              <HospitalShiftCard
                key={index}
                {...shift}
                onViewDetails={() => console.log('View details for shift', index)}
              />
            ))}
          </div>
        </div>

        {/* Recent Applications Section */}
        <div>
          <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray mb-3 sm:mb-4 text-base sm:text-lg">
            Recent Applications
          </Typography>

          <ApplicationsTable
            applications={recentApplications}
            onViewProfile={(application) => console.log('View profile for', application.doctorName)}
          />

          {/* View More Button */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => console.log('View more applications')}
              className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[237px]"
            >
              View More Applications
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
