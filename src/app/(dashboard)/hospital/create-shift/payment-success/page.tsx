'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { PaymentStatusAlert } from '@/components/ui/payment-status-alert';
import { PaymentResultContainer } from '@/components/ui/payment-result-container';
import { ShiftSummaryCard } from '@/components/ui/shift-summary-card';
import { getHospitalShiftById, updateHospitalShiftStatus } from '@/lib/hospitalShifts';
import type { HospitalShiftRecord } from '@/types/hospital';

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout role="hospital">
          <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen" />
        </DashboardLayout>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shiftId = searchParams.get('shiftId');
  const [shift, setShift] = useState<HospitalShiftRecord | null>(null);

  useEffect(() => {
    if (!shiftId) {
      return;
    }

    updateHospitalShiftStatus(shiftId, 'published');
    setShift(getHospitalShiftById(shiftId) ?? null);
  }, [shiftId]);

  const handleBackToMyShifts = () => {
    router.push('/hospital/my-shifts');
  };

  const handleViewShift = () => {
    router.push('/hospital/my-shifts?filter=published');
  };

  if (!shiftId) {
    return (
      <DashboardLayout role="hospital">
        <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
          <div className="w-full bg-white rounded-xl border border-soft-gray p-4">
            <Typography as="p" size="md" className="text-secondary-gray">
              No shift information found. Please return to My Shifts.
            </Typography>
            <Button variant="outline" size="default" onClick={handleBackToMyShifts} className="mt-4 w-auto px-8">
              Back to My Shifts
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="hospital">
      <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        <PaymentResultContainer
          title="Payment Successful"
          subtitle="Your shift has been published"
          actions={
            <>
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
                onClick={handleViewShift}
                className="w-full sm:w-auto whitespace-nowrap !px-[24px] !py-[16px] !min-h-0 h-auto"
              >
                View Shift
              </Button>
            </>
          }
        >
          {shift && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 h-full items-stretch">
              <PaymentStatusAlert
                variant="success"
                className="h-full"
                message="Your payment was successful and your shift is now live. Doctors can start applying to your shift"
              />
              <ShiftSummaryCard
                className="h-full"
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
        </PaymentResultContainer>
      </div>
    </DashboardLayout>
  );
}
