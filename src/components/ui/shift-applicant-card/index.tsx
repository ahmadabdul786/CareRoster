'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import type { ShiftApplicant } from '@/types/hospital';

export interface ShiftApplicantCardProps {
  applicant: ShiftApplicant;
  onAccept?: (applicantId: string) => void;
  onReject?: (applicantId: string) => void;
  onViewDocument?: (applicantId: string, documentName: string) => void;
  className?: string;
}

const actionButtonClass =
  'flex items-center justify-center gap-1 w-full sm:w-[114px] h-[24px] rounded-[36px] border box-border text-[12px] font-medium leading-[24px] px-4 sm:px-6 whitespace-nowrap transition-colors';

export function ShiftApplicantCard({
  applicant,
  onAccept,
  onReject,
  onViewDocument,
  className = '',
}: ShiftApplicantCardProps) {
  const avatarSrc = applicant.avatarUrl ?? '/assets/images/profile.jpg';

  return (
    <div
      className={`w-full min-h-0 lg:min-h-[156px] bg-white rounded-[12px] border border-soft-gray flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:gap-4 lg:py-3 ${className}`}
    >
      {/* Top row on mobile / left column on desktop: photo + details */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0 lg:items-center">
        <div className="relative w-[88px] h-[88px] sm:w-[124px] sm:h-[124px] rounded-[8px] overflow-hidden shrink-0 mx-auto sm:mx-0">
          <Image
            src={avatarSrc}
            alt={applicant.doctorName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 88px, 124px"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col ">
          <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <Typography as="p" size="md" weight="semibold" className="text-dark-gray text-[14px] leading-[24px]">
                {applicant.doctorName}
              </Typography>
              <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-[14px] leading-[24px]">
                <span className="text-dark-gray">Specialty:</span> {applicant.speciality}
              </Typography>
              <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-[14px] leading-[24px]">
                <span className="text-dark-gray">Experience:</span> {applicant.experience}
              </Typography>
            </div>

            {applicant.status === 'pending' && (
              <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onAccept?.(applicant.id)}
                  className={`${actionButtonClass} border-success-green text-md text-success-green hover:bg-success-green/10`}
                >
                  <Icon icon="ph:check-circle" className="w-4 h-4 shrink-0" />
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => onReject?.(applicant.id)}
                  className={`${actionButtonClass} border-alert-red text-md text-alert-red hover:bg-alert-red/10`}
                >
                  <Icon icon="ph:x-circle" className="w-4 h-4 shrink-0" />
                  Reject
                </button>
              </div>
            )}
          </div>

          <div className="rounded-[8px] bg-ultra-light-blue px-3 py-2 w-full">
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray text-[14px] leading-[18px] line-clamp-3 sm:line-clamp-2"
            >
              <span className="text-dark-gray">Cover Note:</span> {applicant.coverNote}
            </Typography>
          </div>
        </div>
      </div>

      {/* Documents — full width on mobile, fixed max on large screens */}
      <div className="flex flex-col justify-center gap-4 shrink-0 w-full lg:w-[475px] lg:max-w-[475px]">
        {applicant.documents.map((doc) => (
          <button
            key={doc.name}
            type="button"
            onClick={() => onViewDocument?.(applicant.id, doc.name)}
            className="flex items-center justify-between gap-3 w-full h-[56px] border border-soft-gray rounded-[8px] px-3 sm:px-4 text-left cursor-pointer hover:border-light-blue/60 hover:bg-ultra-light-blue/40 transition-colors"
            aria-label={`View ${doc.name}`}
          >
            <div className="min-w-0 flex-1">
              <Typography
                as="p"
                size="md"
                weight="normal"
                className="text-dark-gray leading-[18px] truncate text-[14px]"
              >
                {doc.name}
              </Typography>
              <Typography as="p" size="md" weight="normal" className="text-soft-gray leading-4 text-[12px] sm:text-[14px]">
                {doc.size}
              </Typography>
            </div>
            <Icon icon="ph:eye" className="w-5 h-5 text-primary-gray shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
