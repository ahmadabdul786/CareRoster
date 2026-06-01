'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Icon } from '@iconify/react';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { ShiftDetailCard } from '@/components/ui/shift-detail-card';
import { ShiftApplicantCard } from '@/components/ui/shift-applicant-card';
import { getHospitalShiftById } from '@/lib/hospitalShifts';
import { countPendingApplicants, getShiftApplicantsByShiftId } from '@/lib/shiftApplicants';
import type { HospitalShiftRecord, ShiftApplicant } from '@/types/hospital';

export default function HospitalShiftDetailPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout role="hospital">
          <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen" />
        </DashboardLayout>
      }
    >
      <HospitalShiftDetailContent />
    </Suspense>
  );
}

function HospitalShiftDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [shift, setShift] = useState<HospitalShiftRecord | null>(null);
  const [applicants, setApplicants] = useState<ShiftApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setShift(getHospitalShiftById(id) ?? null);
    setApplicants(getShiftApplicantsByShiftId(id));
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout role="hospital">
        <div className="p-3 md:p-6 bg-light-gray/30 min-h-screen" />
      </DashboardLayout>
    );
  }

  if (!id || !shift) return notFound();

  const pendingCount = countPendingApplicants(applicants);

  const handleEditShift = () => {
    router.push(`/hospital/create-shift?shiftId=${shift.id}`);
  };

  const handleAccept = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: 'accepted' as const } : a))
    );
  };

  const handleReject = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: 'rejected' as const } : a))
    );
  };

  return (
    <DashboardLayout role="hospital">
      <div className="p-3 sm:p-4 md:p-6 bg-light-gray/30 min-h-screen max-w-full overflow-x-hidden">
        <nav className="flex items-center gap-2 mb-4 min-w-0 flex-wrap">
          <Link
            href="/hospital/my-shifts"
            className="text-secondary-gray hover:underline text-[14px] font-normal leading-[18px] shrink-0"
          >
            My Shifts
          </Link>
          <Icon icon="ph:caret-right" className="w-4 h-4 text-secondary-gray shrink-0" />
          <span className="text-light-blue text-[14px] font-normal leading-[18px] truncate">
            Shift Details
          </span>
        </nav>

        <div className="mb-4 sm:mb-6">
          <Typography
            as="h1"
            size="h1"
            weight="semibold"
            className="text-dark-gray mb-1 text-xl sm:text-2xl md:text-h1"
          >
            Shift Details
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
            View shift information and manage applicants
          </Typography>
        </div>

        <ShiftDetailCard shift={shift} onEditShift={handleEditShift} className="mb-6 sm:mb-8" />

        <div className="mb-3 sm:mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Typography as="h2" size="h3" weight="semibold" className="text-dark-gray text-base sm:text-h3">
              Applicants
            </Typography>
            {pendingCount > 0 && (
              <span className="px-4 sm:px-6 py-0.5 rounded-full border border-[#BBBBBB] bg-light-gray text-[#BBBBBB] text-sm sm:text-md font-medium shrink-0">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm sm:text-md">
            Review and manage doctor applications for this shift
          </Typography>
        </div>

        {applicants.length > 0 ? (
          <div className="flex flex-col gap-3 sm:gap-4 w-full min-w-0">
            {applicants.map((applicant) => (
              <ShiftApplicantCard
                key={applicant.id}
                applicant={applicant}
                onAccept={handleAccept}
                onReject={handleReject}
                onViewDocument={(applicantId, documentName) =>
                  console.log('View document', documentName, 'for', applicantId)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-[12px] border border-soft-gray">
            <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
              No applicants for this shift yet.
            </Typography>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
