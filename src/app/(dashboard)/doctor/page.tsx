'use client';

import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { ActivityCard } from '@/components/ui/activity-card';

export default function DoctorDashboardPage() {
  return (
    <DashboardLayout role="doctor">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2">
            Doctor Dashboard
          </Typography>
          <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
            Welcome to your doctor dashboard!
          </Typography>
        </div>

        {/* Activity Section */}
        <div>
          <Typography as="h2" size="h3" weight="semibold" className="text-dark-gray mb-4">
            Your Activity
          </Typography>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </DashboardLayout>
  );
}
