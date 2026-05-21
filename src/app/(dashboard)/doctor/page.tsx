'use client';

import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { ActivityCard } from '@/components/ui/activity-card';
import { ShiftListItem } from '@/components/ui/shift-list-item';
import { ApplicationListItem } from '@/components/ui/application-list-item';
import { DoctorShift, DoctorApplicationItem } from '@/types/doctor';

export default function DoctorDashboardPage() {
  const upcomingShifts: DoctorShift[] = [
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

  const recentApplications: DoctorApplicationItem[] = [
    {
      title: 'General Practitioner – Evening Shift',
      hospitalName: 'City Health Clinic',
      status: 'pending' as const,
    },
    {
      title: 'Emergency Doctor – Night Shift',
      hospitalName: 'Royal Care Hospital',
      status: 'accepted' as const,
    },
    {
      title: 'Locum GP – Day Shift',
      hospitalName: 'Sunrise Medical Centre',
      status: 'rejected' as const,
    },
    {
      title: 'General Practitioner – Evening Shift',
      hospitalName: 'City Health Clinic',
      status: 'pending' as const,
    },
    {
      title: 'General Practitioner – Evening Shift',
      hospitalName: 'City Health Clinic',
      status: 'pending' as const,
    },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Welcome Header */}
        <div className="mb-4 sm:mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2">
           Dashboard
          </Typography>
          <Typography as="p" size="lg" weight="normal" className="text-secondary-gray text-sm sm:text-base">
            Overview of your shifts and applications
          </Typography>
        </div>

        {/* Activity Section */}
        <div>
          <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray mb-3 sm:mb-4 text-base sm:text-lg">
            Your Activity
          </Typography>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <ActivityCard
              icon="ph:arrow-fat-up"
              label="Applied Shifts"
              value={12}
              color="blue"
            />
            <ActivityCard
              icon="ph:flag"
              label="Accepted Shifts"
              value={5}
              color="blue"
            />
            <ActivityCard
              icon="ph:check-circle"
              label="Completed Shifts"
              value={8}
              color="green"
            />
          </div>
        </div>

        {/* Shifts and Applications Grid */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Upcoming Accepted Shifts */}
          <div className="w-full lg:w-[650px] bg-white rounded-xl border border-soft-gray overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-light-gray">
              <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray leading-[100%] text-base sm:text-lg">
                Upcoming Accepted Shifts
              </Typography>
            </div>
            <div className="overflow-y-auto max-h-[462px]">
              {upcomingShifts.map((shift, index) => (
                <ShiftListItem
                  key={index}
                  {...shift}
                  onBrowse={() => console.log('Browse shift', index)}
                />
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="w-full lg:w-[459px] bg-white rounded-xl border border-soft-gray overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-light-gray">
              <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray leading-[100%] text-base sm:text-lg">
                Recent Applications
              </Typography>
            </div>
            <div className="overflow-y-auto ">
              {recentApplications.map((application, index) => (
                <ApplicationListItem key={index} {...application} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
