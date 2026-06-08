'use client';

import { ArrowFatUpIcon, FlagIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Typography } from '@/components/shared/typography';
import { ActivityCard } from '@/components/ui/activity-card';
import { ShiftListItem } from '@/components/ui/shift-list-item';
import { ApplicationListItem } from '@/components/ui/application-list-item';
import {
  doctorDashboardActivityStats,
  mockDoctorDashboardRecentApplications,
  mockDoctorDashboardUpcomingShifts,
} from '@/constants/mockDoctorDashboard';

const doctorDashboardActivityIcons = [ArrowFatUpIcon, FlagIcon, CheckCircleIcon];

export default function DoctorDashboardPage() {
  return (
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
            {doctorDashboardActivityStats.map((stat, index) => (
              <ActivityCard
                key={stat.label}
                icon={doctorDashboardActivityIcons[index]}
                label={stat.label}
                value={stat.value}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* Shifts and Applications Grid */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Upcoming Accepted Shifts */}
          <div className="w-full lg:w-[650px] bg-white rounded-xl border border-soft-gray overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-soft-gray">
              <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray leading-[100%] text-base sm:text-lg">
                Upcoming Accepted Shifts
              </Typography>
            </div>
            <div className="overflow-y-auto max-h-[462px]">
              {mockDoctorDashboardUpcomingShifts.map((shift, index) => (
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
            <div className="p-3 sm:p-4 border-b border-soft-gray">
              <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray leading-[100%] text-base sm:text-lg">
                Recent Applications
              </Typography>
            </div>
            <div className="overflow-y-auto ">
              {mockDoctorDashboardRecentApplications.map((application, index) => (
                <ApplicationListItem key={index} {...application} />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
