'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

export interface ShiftSummaryCardProps {
  reference: string;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  price: number;
  className?: string;
}

export function ShiftSummaryCard({
  reference,
  date,
  month,
  year,
  title,
  location,
  time,
  price,
  className = '',
}: ShiftSummaryCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-xl border border-soft-gray flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 ${className}`}
    >
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
          size="xs"
          weight="medium"
          className="text-secondary-gray uppercase tracking-wide"
        >
          Shift Reference
        </Typography>
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

      <div className="text-right shrink-0">
        <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray leading-none">
          ${price}
        </Typography>
        <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
          AUD-Hour
        </Typography>
      </div>
    </div>
  );
}
