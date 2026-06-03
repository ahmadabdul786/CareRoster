'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/shared/typography';
import { ShiftCard } from '@/components/ui/shift-card';
import { mockTimesheets, type Timesheet } from '@/constants/mockTimesheets';

export default function MyTimesheetsPage() {
  const router = useRouter();
  const [timesheets, setTimesheets] = useState<Timesheet[]>(mockTimesheets);

  const handleEdit = (id: number) => {
    router.push(`/doctor/create-timesheet?id=${id}`);
  };

  const handleGenerateInvoice = (id: number) => {
    setTimesheets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, invoiceStatus: 'generated' as const } : t))
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
            My Timesheets
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            View your submitted timesheets and invoice status
          </Typography>
        </div>

        {/* Timesheets Grid */}
        {timesheets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
              No timesheets found.
            </Typography>
            <button
              type="button"
              onClick={() => router.push('/doctor/my-shifts')}
              className="px-6 py-2 rounded-full border border-light-blue text-light-blue text-sm font-medium hover:bg-light-blue/5 transition-colors"
            >
              Go to My Shifts
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {timesheets.map((timesheet) => (
              <ShiftCard
                key={timesheet.id}
                variant="timesheet"
                date={timesheet.date}
                month={timesheet.month}
                year={timesheet.year}
                title={timesheet.title}
                location={timesheet.location}
                hoursWorked={timesheet.hoursWorked}
                invoiceStatus={timesheet.invoiceStatus}
                onEdit={() => handleEdit(timesheet.id)}
                onGenerateInvoice={() => handleGenerateInvoice(timesheet.id)}
              />
            ))}
          </div>
        )}
    </div>
  );
}
