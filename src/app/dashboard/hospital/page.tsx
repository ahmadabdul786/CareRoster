'use client';

import { NotePencilIcon, FileTextIcon, TagSimpleIcon } from '@phosphor-icons/react';
import { Typography } from '@/components/shared/typography';
import { ActivityCard } from '@/components/ui/activity-card';
import { ShiftCard } from '@/components/ui/shift-card';
import { ApplicationsTable } from '@/components/ui/applications-table';
import { Button } from '@/components/shared/button';
import {
  hospitalDashboardActivityStats,
  mockHospitalDashboardActiveShifts,
  mockHospitalDashboardRecentApplications,
} from '@/constants/mockHospitalDashboard';

const hospitalDashboardActivityIcons = [NotePencilIcon, FileTextIcon, TagSimpleIcon];

export default function HospitalDashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Welcome Header */}
        <div className="mb-4 sm:mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2">
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
            {hospitalDashboardActivityStats.map((stat, index) => (
              <ActivityCard
                key={stat.label}
                icon={hospitalDashboardActivityIcons[index]}
                label={stat.label}
                value={stat.value}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* Active Shifts Section */}
        <div>
          <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray mb-3 sm:mb-4 text-base sm:text-lg">
            Active Shifts
          </Typography>

          {/* Shifts Grid - Responsive columns */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {mockHospitalDashboardActiveShifts.map((shift, index) => (
              <ShiftCard
                key={index}
                variant="hospital"
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
            applications={mockHospitalDashboardRecentApplications}
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
  );
}
