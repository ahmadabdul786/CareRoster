'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { PaymentStatusAlert } from '@/components/ui/payment-status-alert';
import { ShiftSummaryCard } from '@/components/ui/shift-summary-card';
import { getHospitalShiftById } from '@/lib/hospitalShifts';
import type { HospitalShiftRecord } from '@/types/hospital';

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout role="hospital">
          <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen" />
        </DashboardLayout>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
}

function PaymentFailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shiftId = searchParams.get('shiftId');
  const [shift, setShift] = useState<HospitalShiftRecord | null>(null);

  useEffect(() => {
    if (!shiftId) {
      return;
    }

    setShift(getHospitalShiftById(shiftId) ?? null);
  }, [shiftId]);

  const handleBackToMyShifts = () => {
    router.push('/hospital/my-shifts');
  };

  const handleRetryPayment = () => {
    if (!shiftId) {
      return;
    }

    router.push(`/hospital/create-shift/payment-success?shiftId=${shiftId}`);
  };

  if (!shiftId) {
    return (
      <DashboardLayout role="hospital">
        <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
          <Typography as="p" size="md" className="text-secondary-gray">
            No shift information found. Please return to My Shifts.
          </Typography>
          <Button variant="outline" size="default" onClick={handleBackToMyShifts} className="mt-4 w-auto px-8">
            Back to My Shifts
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="hospital">
      <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              Payment Not Completed
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
              Your shift has not been published
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              variant="outline"
              size="default"
              onClick={handleBackToMyShifts}
              className="w-full sm:w-auto sm:min-w-[180px] whitespace-nowrap"
            >
              Back to My Shifts
            </Button>
            <Button
              variant="primary"
              size="default"
              onClick={handleRetryPayment}
              className="w-full sm:w-auto sm:min-w-[160px] whitespace-nowrap"
            >
              Retry Payment
            </Button>
          </div>
        </div>

        {shift && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <PaymentStatusAlert
              variant="error"
              message="Your payment was not completed. Please retry to publish your shift"
            />
            <ShiftSummaryCard
              reference={shift.reference}
              date={shift.date}
              month={shift.month}
              year={shift.year}
              title={shift.title}
              location={shift.location}
              time={shift.time}
              price={shift.price}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
