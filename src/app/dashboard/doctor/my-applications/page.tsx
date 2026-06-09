'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { ShiftCard } from '@/components/ui/shift-card';
import { DoctorApplication } from '@/types/doctor';
import { Icon } from '@iconify/react';
import { mockApplications } from '@/constants/mockApplications';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<DoctorApplication[]>(mockApplications);

  const handleWithdraw = (id: number) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'withdrawn' as const } : app))
    );
  };

  return (
    <div className="flex flex-col p-3 md:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              My Applications
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
              Track the status of your submitted shift applications
            </Typography>
          </div>
          <Link href="/dashboard/doctor/browse-shifts" className="shrink-0">
            <Button variant="outline" size="default">
              Browse Shifts
            </Button>
          </Link>
        </div>

        {/* Applications Grid / Empty State */}
        {applications.length > 0 ? (
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
        ) : (
          <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4">
              <Icon icon="ph:file-arrow-up" className="w-4 h-4 text-primary-gray" />
            </div>
            <Typography as="h3" size="lg" weight="medium" className="text-secondary-gray mb-2">
              No applications yet
            </Typography>
            <Typography as="p" size="lg" weight="normal" className="text-primary-gray max-w-[280px] leading-snug">
              You haven&apos;t applied to any shifts. Start by browsing available shifts
            </Typography>
          </div>
          </div>
        )}
    </div>
  );
}
