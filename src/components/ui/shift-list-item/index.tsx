'use client';

import { Typography } from '@/components/shared/typography';

interface ShiftListItemProps {
  date: string;
  month: string;
  year: string;
  title: string;
  hospitalName: string;
  time: string;
  location: string;
  onBrowse?: () => void;
}

export function ShiftListItem({
  date,
  month,
  year,
  title,
  hospitalName,
  time,
  location,
  onBrowse,
}: ShiftListItemProps) {
  return (
    <div className="flex items-center gap-4 h-[120px] border-b border-light-gray last:border-b-0 px-4">
      {/* Date Badge */}
      <div className="flex flex-col items-center justify-center w-[80px] h-[88px] bg-ultra-light-blue rounded-lg p-4">
        <Typography
          as="p"
          size="h1"
          weight="semibold"
          className="text-dark-blue leading-[35px] text-center"
        >
          {date}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-dark-gray leading-6 text-center"
        >
          {month}-{year}
        </Typography>
      </div>

      {/* Shift Details */}
      <div className="flex-1 flex flex-col gap-1">
        <Typography
          as="h3"
          size="md"
          weight="semibold"
          className="text-dark-gray leading-4"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-light-blue leading-[18px]"
        >
          {hospitalName}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-secondary-gray leading-[18px]"
        >
          {time}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-secondary-gray leading-[18px]"
        >
          {location}
        </Typography>
      </div>

      {/* Browse Button */}
      {onBrowse && (
        <button
          onClick={onBrowse}
          className="px-6 py-2 border border-light-blue text-light-blue rounded-full hover:bg-light-blue hover:text-white transition-all text-md font-medium"
        >
          Browse Shift
        </button>
      )}
    </div>
  );
}
