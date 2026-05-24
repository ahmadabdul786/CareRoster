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
  onEditShift,
  onPublish,
  className = '',
}: HospitalMyShiftCardProps) {
  const statusStyle = shiftStatusStyles[status];

  return (
    <div
      className={`w-full bg-white rounded-xl border border-soft-gray flex flex-col gap-3 p-3 sm:px-4 sm:py-4 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col items-center justify-center w-[72px] h-[72px] sm:w-[98px] sm:h-[98px] bg-ultra-light-blue rounded-lg shrink-0">
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

        <div className="flex-1 flex flex-col gap-1 min-w-0">
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

          <div className="flex items-center gap-2 mt-0.5">
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

        <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-start shrink-0">
          <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray leading-none">
            ${price}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            AUD-Hour
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 border-t border-soft-gray/60 sm:border-0 sm:pt-0">
        <div className="sm:hidden">
          <Typography as="span" size="md" weight="semibold" className="text-dark-gray leading-none">
            ${price}
          </Typography>
          <Typography as="span" size="sm" weight="normal" className="text-secondary-gray ml-1">
            AUD-Hour
          </Typography>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onEditShift}
            className="px-4 sm:px-6 py-1 rounded-full border border-light-blue text-light-blue text-xs sm:text-sm font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Edit Shift
          </button>
          {status === 'draft' && onPublish && (
            <button
              type="button"
              onClick={onPublish}
              className="px-4 sm:px-6 py-1 rounded-full border border-light-blue text-light-blue text-xs sm:text-sm font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
