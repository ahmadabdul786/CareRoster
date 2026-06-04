'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import { shiftStatusStyles } from '@/constants/statusStyles';
import type { HospitalShiftRecord } from '@/types/hospital';
import { getShiftDescription, getShiftTimeDisplay } from '@/lib/shiftDisplay';

export interface ShiftDetailCardProps {
  shift: HospitalShiftRecord;
  onEditShift?: () => void;
  className?: string;
}

export function ShiftDetailCard({ shift, onEditShift, className = '' }: ShiftDetailCardProps) {
  const statusStyle = shiftStatusStyles[shift.status];
  const description = getShiftDescription(shift);
  const timeDisplay = getShiftTimeDisplay(shift);

  const dateBadgeClass =
    'flex flex-col items-center justify-center bg-ultra-light-blue rounded-[8px] shrink-0 ' +
    'w-[72px] h-[72px] min-[400px]:w-[88px] min-[400px]:h-[88px] sm:w-[98px] sm:h-[98px] md:w-[124px] md:h-[124px]';

  return (
    <div
      className={`w-full min-w-0 bg-white rounded-[12px] border border-soft-gray flex flex-col md:flex-row md:items-stretch gap-3 p-3 sm:gap-4 sm:p-4 ${className}`}
    >
      {/* Mobile / tablet top: date + price (hidden on md+) */}
      <div className="flex flex-row items-center justify-between gap-3 md:hidden">
        <div className={dateBadgeClass}>
          <Typography
            as="p"
            size="h1"
            weight="semibold"
            className="text-dark-blue leading-tight text-center text-lg min-[400px]:text-xl sm:text-2xl"
          >
            {shift.date}
          </Typography>
          <Typography
            as="p"
            size="md"
            weight="normal"
            className="text-dark-gray leading-4 text-center text-[10px] min-[400px]:text-xs sm:text-md"
          >
            {shift.month}-{shift.year}
          </Typography>
        </div>

        <div className="text-right shrink-0">
          <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray leading-none text-lg sm:text-h3">
            ${shift.price}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-xs sm:text-md">
            AUD-Hour
          </Typography>
        </div>
      </div>

      {/* Desktop date badge */}
      <div className={`hidden md:flex ${dateBadgeClass} self-center`}>
        <Typography
          as="p"
          size="h1"
          weight="semibold"
          className="text-dark-blue leading-[35px] text-center text-2xl"
        >
          {shift.date}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-dark-gray leading-6 text-center text-md"
        >
          {shift.month}-{shift.year}
        </Typography>
      </div>

      {/* Shift details */}
      <div className="flex-1 flex flex-col min-w-0 gap-2 sm:gap-3 md:min-h-[124px] md:justify-between">
        <div className="flex flex-col gap-1 min-w-0">
          <Typography
            as="p"
            size="md"
            weight="semibold"
            className="text-dark-gray leading-snug text-sm sm:text-md break-words"
          >
            {shift.title}
          </Typography>

          <Typography
            as="p"
            size="md"
            weight="normal"
            className="text-secondary-gray leading-[18px] text-[13px] sm:text-[14px] break-words"
          >
            <span className="font-normal text-dark-gray">Description:</span> {description}
          </Typography>

          <div className="flex items-start gap-1.5 min-w-0">
            <Icon icon="ph:map-pin" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-light-blue shrink-0 mt-0.5" />
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-light-blue leading-[18px] text-[13px] sm:text-[14px] break-words min-w-0"
            >
              {shift.location}
            </Typography>
          </div>

          <div className="flex items-start gap-1.5 min-w-0">
            <Icon icon="ph:clock" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-gray shrink-0 mt-0.5" />
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray leading-[18px] text-[13px] sm:text-[14px] break-words min-w-0"
            >
              {timeDisplay}
            </Typography>
          </div>
        </div>

        {/* Status + Edit on small screens */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-soft-gray/60 md:border-t-0 md:pt-0 md:mt-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Typography as="span" size="md" weight="normal" className="text-secondary-gray text-[13px] sm:text-[14px]">
              Status:
            </Typography>
            <span
              className={`inline-flex px-3 sm:px-4 py-1 rounded-full text-[12px] sm:text-[14px] font-medium leading-[18px] ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </span>
          </div>

          {onEditShift && (
            <button
              type="button"
              onClick={onEditShift}
              className="w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-1 rounded-full border border-light-blue text-light-blue text-xs sm:text-md font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap md:hidden"
            >
              Edit Shift
            </button>
          )}
        </div>
      </div>

      {/* Price + Edit — desktop only (md+) */}
      <div className="hidden md:flex flex-col items-end justify-between shrink-0 min-h-[124px] gap-2">
        <div className="text-right">
          <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray leading-none">
            ${shift.price}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            AUD-Hour
          </Typography>
        </div>

        {onEditShift && (
          <button
            type="button"
            onClick={onEditShift}
            className="px-6 py-1 rounded-full border border-light-blue text-light-blue text-md font-medium hover:bg-light-blue hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Edit Shift
          </button>
        )}
      </div>
    </div>
  );
}
