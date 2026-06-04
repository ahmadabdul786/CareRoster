'use client';

import { MapPinIcon, ClockIcon, CheckCircleIcon, PencilSimpleLineIcon } from '@phosphor-icons/react';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { shiftStatusStyles, applicationStatusStyles, timesheetInvoiceStatusStyles } from '@/constants/statusStyles';
import type { ShiftCardProps } from './types';

export type { ShiftCardProps } from './types';

export function ShiftCard(props: ShiftCardProps) {
  const { date, month, year, title, location, className = '' } = props;

  if (props.variant === 'timesheet') {
    const invoiceStyle = timesheetInvoiceStatusStyles[props.invoiceStatus];
    return (
      <div
        className={`
          w-full bg-white rounded-xl border border-soft-gray
          flex flex-row items-start gap-3 sm:gap-4 p-3 sm:px-4 sm:py-4
          hover:shadow-md transition-shadow duration-200
          ${className}
        `}
      >
        {/* Date Badge */}
        <div className="flex flex-col items-center justify-center w-[72px] h-[72px] sm:w-[98px] sm:h-[98px] bg-ultra-light-blue rounded-lg shrink-0">
          <Typography as="p" size="h1" weight="semibold" className="text-dark-blue leading-[35px] text-center text-2xl">
            {date}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-dark-gray leading-6 text-center text-xs sm:text-md">
            {month}-{year}
          </Typography>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Typography as="p" size="md" weight="semibold" className="text-dark-gray leading-snug text-sm sm:text-md">
              {title}
            </Typography>
            <button
              type="button"
              onClick={props.onEdit}
              className="cursor-pointer shrink-0 text-secondary-gray hover:text-light-blue transition-colors"
              aria-label="Edit timesheet"
            >
              <PencilSimpleLineIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <MapPinIcon weight="bold" className="w-3 h-3 sm:w-4 sm:h-4 text-light-blue shrink-0" />
            <Typography as="p" size="md" weight="normal" className="text-light-blue leading-[18px] text-xs sm:text-md truncate">
              {location}
            </Typography>
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon weight="bold" className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray shrink-0" />
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray leading-[18px] text-xs sm:text-md">
              Hours Worked: {props.hoursWorked} hrs
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-0.5 w-full min-w-0">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <Typography as="span" size="md" weight="normal" className="text-secondary-gray shrink-0 text-xs sm:text-md">
                Invoice Status:
              </Typography>
              <Typography
                as="span"
                size="md"
                weight="medium"
                className={`shrink-0 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-md ${invoiceStyle.bg} ${invoiceStyle.text}`}
              >
                {invoiceStyle.label}
              </Typography>
            </div>
            <Button
              type="button"
              variant="primary"
              size="shift"
              onClick={props.onGenerateInvoice}
              className="!w-full sm:!w-auto shrink-0"
            >
              Generate Invoice
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const time = (props.variant === 'hospital' || props.variant === 'doctor' || props.variant === 'my-shifts') ? props.time : '';

  const statusStyle =
    props.variant === 'hospital'
      ? shiftStatusStyles[props.status]
      : props.variant === 'doctor'
      ? applicationStatusStyles[props.status]
      : null;

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
          <MapPinIcon weight="bold" className="w-3 h-3 sm:w-4 sm:h-4 text-light-blue shrink-0" />
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
          <ClockIcon weight="bold" className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray shrink-0" />
          <Typography
            as="p"
            size="md"
            weight="normal"
            className="text-secondary-gray leading-[18px] text-xs sm:text-md"
          >
            {time}
          </Typography>
        </div>

        {/* Status row — hospital / doctor variants */}
        {statusStyle && (
          <div
            className={`mt-1 sm:mt-0 w-full min-w-0 gap-2 ${
              props.variant === 'doctor' && props.status === 'pending'
                ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between'
                : 'flex flex-wrap items-center sm:flex-nowrap sm:justify-between'
            }`}
          >
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <Typography
                as="span"
                size="md"
                weight="normal"
                className="text-secondary-gray shrink-0"
              >
                Status:
              </Typography>
              <Typography
                as="span"
                size="md"
                weight="medium"
                className={`px-3 sm:px-4 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text}`}
              >
                {statusStyle.label}
              </Typography>
            </div>

            {/* Withdraw button — doctor variant, pending only */}
            {props.variant === 'doctor' && props.status === 'pending' && (
              <Button
                type="button"
                variant="primary"
                size="shift"
                onClick={props.onWithdraw}
                className="!w-full sm:!w-auto shrink-0"
              >
                <span className="sm:hidden">Withdraw</span>
                <span className="hidden sm:inline">Withdraw Application</span>
              </Button>
            )}
          </div>
        )}

        {/* Timesheet / View Details action row — my-shifts variant */}
        {props.variant === 'my-shifts' && (
          <div className="mt-0.5 sm:mt-0">
            {props.shiftType === 'upcoming' ? (
              <Button
                type="button"
                variant="primary"
                size="shift"
                onClick={props.onViewDetails}
                className="mt-1.5"
              >
                View Details
              </Button>
            ) : props.timesheetCreated ? (
              <Typography as="span" size="md" weight="medium" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9F6CA] text-[#00C853] font-medium">
                <CheckCircleIcon weight="bold" className="w-4 h-4 shrink-0" />
                Timesheet Created
              </Typography>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="shift"
                onClick={props.onCreateTimesheet}
              >
                Create Timesheet
              </Button>
            )}
          </div>
        )}

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
            <Button
              type="button"
              variant="primary"
              size="shift"
              onClick={props.onViewDetails}
            >
              View Details
            </Button>
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

          <Button
            type="button"
            variant="primary"
            size="shift"
            onClick={props.onViewDetails}
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}
