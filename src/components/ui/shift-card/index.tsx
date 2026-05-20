'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import { shiftStatusStyles, applicationStatusStyles } from '@/constants/statusStyles';

type HospitalVariantProps = {
  variant: 'hospital';
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: 'published' | 'filled' | 'pending';
  price: number;
  onViewDetails?: () => void;
  className?: string;
};

type DoctorVariantProps = {
  variant: 'doctor';
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  status: 'accepted' | 'pending' | 'rejected' | 'withdrawn';
  onWithdraw?: () => void;
  className?: string;
};

export type ShiftCardProps = HospitalVariantProps | DoctorVariantProps;

export function ShiftCard(props: ShiftCardProps) {
  const { date, month, year, title, location, time, className = '' } = props;

  const statusStyle =
    props.variant === 'hospital'
      ? shiftStatusStyles[props.status]
      : applicationStatusStyles[props.status];

  return (
    <div
      className={`
        w-full bg-white rounded-xl border border-soft-gray
        flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:px-4 sm:py-4
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Date Badge */}
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

      {/* Shift Details */}
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

        {/* Status row */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-between mt-0.5 sm:mt-0">
          <div className="flex items-center gap-2">
            <Typography
              as="span"
              size="md"
              weight="normal"
              className="text-secondary-gray"
            >
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

          {/* Withdraw button — doctor variant, pending only */}
          {props.variant === 'doctor' && props.status === 'pending' && (
            <button
              type="button"
              onClick={props.onWithdraw}
              className="px-4 sm:px-6 py-0.5 rounded-full border border-light-blue text-light-blue text-xs sm:text-md font-medium hover:bg-light-blue/5 transition-colors whitespace-nowrap"
            >
              Withdraw Application
            </button>
          )}
        </div>

        {/* Price + View Details — hospital variant, mobile only (below details) */}
        {props.variant === 'hospital' && (
          <div className="flex items-center justify-between mt-1 sm:hidden">
            <div>
              <Typography as="span" size="md" weight="semibold" className="text-dark-gray leading-none">
                ${props.price}
              </Typography>
              <Typography as="span" size="sm" weight="normal" className="text-secondary-gray ml-1">
                AUD-Hour
              </Typography>
            </div>
            <button
              onClick={props.onViewDetails}
              className="px-4 py-1 rounded-full border border-light-blue text-light-blue text-xs font-medium whitespace-nowrap hover:bg-light-blue hover:text-white transition-all duration-200"
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Price + View Details — hospital variant, right column on sm+ only */}
      {props.variant === 'hospital' && (
        <div className="hidden sm:flex sm:flex-col sm:items-end sm:justify-start sm:gap-6 shrink-0">
          <div className="text-right">
            <Typography
              as="h3"
              size="h3"
              weight="semibold"
              className="text-dark-gray leading-none"
            >
              ${props.price}
            </Typography>
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray"
            >
              AUD-Hour
            </Typography>
          </div>

          <button
            onClick={props.onViewDetails}
            className="px-3 sm:px-6 py-1 sm:py-0.5 rounded-full border border-light-blue text-light-blue text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-light-blue hover:text-white transition-all duration-200"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
