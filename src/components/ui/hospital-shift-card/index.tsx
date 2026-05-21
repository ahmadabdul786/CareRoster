'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import { HospitalShift } from '@/types/hospital';
import { shiftStatusStyles } from '@/constants/statusStyles';

interface HospitalShiftCardProps extends HospitalShift {
  onViewDetails?: () => void;
  className?: string;
}

export function HospitalShiftCard({
  date,
  month,
  year,
  title,
  location,
  time,
  status,
  price,
  onViewDetails,
  className = '',
}: HospitalShiftCardProps) {
  const statusStyle = shiftStatusStyles[status];

  return (
    <div
      className={`
        w-full max-w-[559px] min-h-[130px] bg-white rounded-xl border border-soft-gray
        flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:px-4 sm:py-4
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Date Badge - Responsive sizing */}
      <div className="flex flex-col items-center justify-center w-[80px] h-[80px] sm:w-[98px] sm:h-[98px] bg-ultra-light-blue rounded-lg shrink-0">
        <Typography
          as="p"
          size="h1"
          weight="semibold"
          className="text-dark-blue leading-[35px] text-center text-2xl sm:text-3xl"
        >
          {date}
        </Typography>
        <Typography
          as="p"
          size="sm"
          weight="normal"
          className="text-dark-gray leading-6 text-center text-xs sm:text-sm"
        >
          {month}-{year}
        </Typography>
      </div>

      {/* Shift Details */}
      <div className="flex-1 flex flex-col gap-1 w-full sm:w-auto">
        <Typography
          as="h3"
          size="md"
          weight="semibold"
          className="text-dark-gray leading-4 text-sm sm:text-base"
        >
          {title}
        </Typography>
        
        <div className="flex items-center gap-1">
          <Icon icon="ph:map-pin" className="w-3 h-3 sm:w-4 sm:h-4 text-light-blue" />
          <Typography
            as="p"
            size="sm"
            weight="normal"
            className="text-light-blue leading-[18px] text-xs sm:text-sm"
          >
            {location}
          </Typography>
        </div>

        <div className="flex items-center gap-1">
          <Icon icon="ph:clock" className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray" />
          <Typography
            as="p"
            size="sm"
            weight="normal"
            className="text-secondary-gray leading-[18px] text-xs sm:text-sm"
          >
            {time}
          </Typography>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Typography
            as="span"
            size="sm"
            weight="normal"
            className="text-secondary-gray text-xs"
          >
            Status:
          </Typography>
          <Typography
           as="span"
            size="sm"
            weight="medium"
            className={`
              px-2 sm:px-3 py-0.5 rounded-full text-xs
              ${statusStyle.bg} ${statusStyle.text}
            `}
          >
            {statusStyle.label}
          </Typography>
        </div>
      </div>

      {/* Price and Button Section */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-6 shrink-0 w-full sm:w-auto">
        <div className="text-left sm:text-right">
          <Typography
            as="h3"
            size="h3"
            weight="semibold"
            className="text-dark-gray leading-none text-xl sm:text-2xl"
          >
            ${price}
          </Typography>
          <Typography
            as="p"
            size="sm"
            weight="normal"
            className="text-secondary-gray text-xs sm:text-sm"
          >
            AUD-Hour
          </Typography>
        </div>

        <button
          onClick={onViewDetails}
          className="
            px-3 sm:px-4 py-1 sm:py-0.5 rounded-full border border-light-blue
            text-light-blue text-xs sm:text-sm font-medium whitespace-nowrap
            hover:bg-light-blue hover:text-white transition-all duration-200
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
}
