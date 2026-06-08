'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/shared/typography';
import { ShiftCard } from '@/components/ui/shift-card';
import { TabToggle } from '@/components/ui/tab-toggle';
import { MyShift, ShiftTab } from '@/types/doctor';
import { mockShifts } from '@/constants/mockShifts';

export default function MyShiftsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShiftTab>('past');
  const [shifts] = useState<MyShift[]>(mockShifts);

  const filtered = shifts.filter((s) => s.type === activeTab);

  const handleCreateTimesheet = (id: number) => {
    router.push(`/dashboard-doctor/create-timesheet?shiftId=${id}`);
  };

  return (
    <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              My Shifts
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
              View your upcoming and completed shifts
            </Typography>
          </div>

          {/* Past / Upcoming toggle */}
          <TabToggle
            options={[
              { value: 'past', label: 'Past' },
              { value: 'upcoming', label: 'Upcoming' },
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Shifts Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
            {filtered.map((shift) => (
              <ShiftCard
                key={shift.id}
                variant="my-shifts"
                shiftType={shift.type}
                date={shift.date}
                month={shift.month}
                year={shift.year}
                title={shift.title}
                location={shift.hospitalName}
                time={shift.time}
                timesheetCreated={shift.timesheetCreated}
                onCreateTimesheet={() => handleCreateTimesheet(shift.id)}
                onViewDetails={() => console.log('View details for shift', shift.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
              No {activeTab} shifts found.
            </Typography>
          </div>
        )}
    </div>
  );
}
