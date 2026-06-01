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
      className={`w-full bg-white rounded-xl border border-soft-gray flex flex-row items-start gap-3 p-4 ${className}`}
    >
      <div className="flex flex-col items-center justify-center w-[98px] h-[98px] bg-ultra-light-blue rounded-[8px] shrink-0">
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
          className="text-dark-gray leading-6 text-center text-xs"
        >
          {month}-{year}
        </Typography>
      </div>

      <div className="flex-1 relative min-w-0 pr-[72px]">
        <p className="font-normal text-[14px] leading-[18px] tracking-[-0.08px] text-[#9E9E9E] uppercase">
          Shift Reference
        </p>

        <div className="absolute top-0 right-0 text-right">
          <Typography as="span" size="h3" weight="semibold" className="text-dark-gray leading-none block">
            ${price}
          </Typography>
          <Typography as="span" size="sm" weight="normal" className="text-secondary-gray block">
            AUD-Hour
          </Typography>
        </div>

        <Typography
          as="p"
          size="md"
          weight="semibold"
          className="text-dark-gray text-sm sm:text-md leading-[18px] mt-[12px]"
        >
          {title}
        </Typography>

        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1 min-w-0">
            <Icon icon="ph:map-pin" className="w-4 h-4 text-light-blue shrink-0" />
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
            <Icon icon="ph:clock" className="w-4 h-4 text-secondary-gray shrink-0" />
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
      </div>
    </div>
  );
}
