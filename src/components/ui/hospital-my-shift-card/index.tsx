'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import { shiftStatusStyles } from '@/constants/statusStyles';
import type { ShiftStatus } from '@/types/hospital';

export interface HospitalMyShiftCardProps {
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: ShiftStatus;
  price: number;
  onViewDetails?: () => void;
  onEditShift?: () => void;
  onPublish?: () => void;
  className?: string;
}

export function HospitalMyShiftCard({
  date,
  month,
  year,
  title,
  location,
  time,
  status,
  price,
  onViewDetails,
  onEditShift,
  onPublish,
  className = '',
}: HospitalMyShiftCardProps) {
  const statusStyle = shiftStatusStyles[status];

  return (
    <div
      role={onViewDetails ? 'button' : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      onClick={onViewDetails}
      onKeyDown={
        onViewDetails
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewDetails();
              }
            }
          : undefined
      }
      className={`w-full bg-white rounded-[12px] border border-soft-gray flex flex-row items-stretch gap-3 sm:gap-4 p-3 sm:px-4 sm:py-4 hover:shadow-md transition-shadow duration-200 ${onViewDetails ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Date badge — 98×98, 8px radius */}
      <div className="flex flex-col items-center justify-center w-[98px] h-[98px] bg-ultra-light-blue rounded-[8px] shrink-0 self-center">
        <Typography
          as="p"
          size="h1"
          weight="semibold"
          className="text-dark-blue leading-[35px] text-center text-2xl"
        >
          {date}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-dark-gray leading-6 text-center text-xs sm:text-md"
        >
          {month}-{year}
        </Typography>
      </div>

      {/* Shift details + status (bottom-aligned with action buttons) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-[98px]">
        <div className="flex flex-col gap-1">
          <Typography
            as="p"
            size="md"
            weight="semibold"
            className="text-dark-gray leading-snug text-sm sm:text-md"
          >
            {title}
          </Typography>

          <div className="flex items-center gap-1">
            <Icon icon="ph:map-pin" className="w-3 h-3 sm:w-4 sm:h-4 text-light-blue shrink-0" />
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-light-blue leading-[18px] text-xs sm:text-md truncate"
            >
              {location}
            </Typography>
          </div>

          <div className="flex items-center gap-1">
            <Icon icon="ph:clock" className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray shrink-0" />
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray leading-[18px] text-xs sm:text-md"
            >
              {time}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-2 sm:pt-0">
          <Typography as="span" size="md" weight="normal" className="text-secondary-gray">
            Status:
          </Typography>
          <Typography
            as="span"
            size="md"
            weight="medium"
            className={`px-4 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
          >
            {statusStyle.label}
          </Typography>
        </div>
      </div>

      {/* Price (top) + actions (bottom, aligned with status row) */}
      <div className="flex flex-col items-end justify-between shrink-0 min-h-[98px] gap-2">
        <div className="text-right">
          <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray leading-none">
            ${price}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            AUD-Hour
          </Typography>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditShift?.();
            }}
            className="px-4 sm:px-6 py-1 rounded-full border border-light-blue text-light-blue text-xs sm:text-md font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Edit Shift
          </button>
          {status === 'draft' && onPublish && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPublish();
              }}
              className="px-4 sm:px-6 py-1 rounded-full border border-light-blue text-light-blue text-xs sm:text-md font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
