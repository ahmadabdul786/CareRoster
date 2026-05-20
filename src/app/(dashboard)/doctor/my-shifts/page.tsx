'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { ShiftCard } from '@/components/ui/shift-card';
import { MyShift, ShiftTab } from '@/types/myShifts';
import { mockShifts } from '@/constants/mockShifts';

export default function MyShiftsPage() {
  const [activeTab, setActiveTab] = useState<ShiftTab>('past');
  const [shifts, setShifts] = useState<MyShift[]>(mockShifts);

  const filtered = shifts.filter((s) => s.type === activeTab);

  const handleCreateTimesheet = (id: number) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, timesheetCreated: true } : s))
    );
  };

  return (
    <DashboardLayout role="doctor">
      <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1 text-[32px]">
              My Shifts
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
              View your upcoming and completed shifts
            </Typography>
          </div>

          {/* Past / Upcoming toggle */}
          <div className="flex items-center bg-white border border-soft-gray rounded-xl py-[3px] px-2 gap-1 self-start sm:self-auto shrink-0 w-[191px] h-[52px]">
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`w-[62px] h-[42px] rounded-xl px-4 text-[14px] font-normal leading-[100%] text-[#212121] transition-all ${
                activeTab === 'past'
                  ? 'bg-[#2196F380]'
                  : 'hover:bg-light-gray/50'
              }`}
            >
              Past
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={` h-[42px] rounded-xl px-4 text-[14px] font-normal leading-[100%] text-[#212121] transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#2196F380]'
                  : 'hover:bg-light-gray/50'
              }`}
            >
              Upcoming
            </button>
          </div>
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
    </DashboardLayout>
  );
}
