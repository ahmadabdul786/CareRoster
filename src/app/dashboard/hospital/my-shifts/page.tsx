'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@/components/shared/typography';
import { TabToggle } from '@/components/ui/tab-toggle';
import { HospitalMyShiftCard } from '@/components/ui/hospital-my-shift-card';
import {
  filterHospitalShifts,
  getStoredHospitalShifts,
  type ShiftFilterStatus,
} from '@/lib/hospitalShifts';
import type { HospitalShiftRecord } from '@/types/hospital';

const FILTER_OPTIONS: { value: ShiftFilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'filled', label: 'Filled' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

export default function HospitalMyShiftsPage() {
  return (
    <Suspense
      fallback={<div className="p-3 md:p-6 bg-light-gray/30 min-h-screen" />}
    >
      <HospitalMyShiftsContent />
    </Suspense>
  );
}

function HospitalMyShiftsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get('filter') as ShiftFilterStatus) || 'all';
  const [activeFilter, setActiveFilter] = useState<ShiftFilterStatus>(initialFilter);
  const [shifts, setShifts] = useState<HospitalShiftRecord[]>([]);

  const loadShifts = useCallback(() => {
    setShifts(getStoredHospitalShifts());
  }, []);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  useEffect(() => {
    const filter = searchParams.get('filter') as ShiftFilterStatus | null;
    if (filter && FILTER_OPTIONS.some((option) => option.value === filter)) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  const filteredShifts = filterHospitalShifts(shifts, activeFilter);

  const handleEditShift = (shiftId: string) => {
    router.push(`/dashboard/hospital/create-shift?shiftId=${shiftId}`);
  };

  const handlePublish = (shiftId: string) => {
    router.push(`/dashboard/hospital/create-shift/payment-success?shiftId=${shiftId}`);
  };

  const handleViewShift = (shiftId: string) => {
    router.push(`/dashboard/hospital/my-shifts/${shiftId}`);
  };

  return (
      <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-3 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              My Shifts
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
              Manage all your posted shifts
            </Typography>
          </div>

          <TabToggle
            options={FILTER_OPTIONS}
            active={activeFilter}
            onChange={setActiveFilter}
            className="overflow-x-auto max-w-full"
          />
        </div>

        {filteredShifts.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
            {filteredShifts.map((shift) => (
              <HospitalMyShiftCard
                key={shift.id}
                date={shift.date}
                month={shift.month}
                year={shift.year}
                title={shift.title}
                location={shift.location}
                time={shift.time}
                status={shift.status}
                price={shift.price}
                onViewDetails={() => handleViewShift(shift.id)}
                onEditShift={() => handleEditShift(shift.id)}
                onPublish={shift.status === 'draft' ? () => handlePublish(shift.id) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
              No shifts found for this filter.
            </Typography>
          </div>
        )}
      </div>
  );
}
