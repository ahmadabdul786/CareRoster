'use client';

import { Icon } from '@iconify/react';
import { MapPinIcon, ClockIcon } from '@phosphor-icons/react';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';

interface ShiftDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  shift: {
    id: number;
    title: string;
    hospital: string;
    date: string;
    month: string;
    time: string;
    experienceLevel: string;
    payRate: number;
    specialty?: string;
    description?: string;
    hospitalOverview?: string;
    hasConflict?: boolean;
  } | null;
}

export function ShiftDetailsDialog({ isOpen, onClose, shift }: ShiftDetailsDialogProps) {
  if (!isOpen || !shift) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed top-0 md:top-[60px] right-0 w-full md:w-[536px] h-screen md:h-[calc(100vh-60px)] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Close Button Header */}
        <div className="shrink-0 bg-lighter-gray border border-soft-gray flex items-center justify-end px-4 py-2 h-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-light-blue hover:text-dark-blue/80 transition-colors"
          >
            <Typography
              as="span"
              size="md"
              weight="medium"
              className="text-light-blue"
            >
              Close
            </Typography>
            <Icon icon="ph:x" className="w-6 h-6 text-light-blue" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          {/* Shift Title */}
          <Typography
            as="h2"
            size="h3"
            weight="semibold"
            className="text-dark-gray mb-4 md:mb-6 text-lg md:text-xl"
          >
            {shift.title}
          </Typography>

          {/* Shift Information Section */}
          <Typography
            as="h3"
            size="h4"
            weight="semibold"
            className="text-dark-gray mb-3 md:mb-4"
          >
            Shift Information
          </Typography>

          {/* Date Badge and Info */}
          <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Date Badge */}
            <div className="w-16 h-16 md:w-[79px] md:h-[79px] bg-light-blue/10 rounded-lg flex flex-col items-center justify-center shrink-0">
              <Typography
                as="span"
                size="h1"
                weight="bold"
                className="text-light-blue text-2xl md:text-[32px] leading-none"
              >
                {shift.date}
              </Typography>
              <Typography
                as="span"
                size="sm"
                weight="normal"
                className="text-secondary-gray text-xs"
              >
                {shift.month}
              </Typography>
            </div>

            {/* Shift Info and Pay Rate Container */}
            <div className="flex flex-col md:flex-row flex-1 w-full gap-3 md:gap-4">
              {/* Shift Info */}
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <MapPinIcon weight="bold" className="w-4 h-4 md:w-5 md:h-5 text-light-blue shrink-0 mt-0.5" />
                  <Typography
                    as="p"
                    size="md"
                    weight="normal"
                    className="text-light-blue text-sm md:text-base"
                  >
                    {shift.hospital}
                  </Typography>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <ClockIcon weight="bold" className="w-4 h-4 md:w-5 md:h-5 text-secondary-gray" />
                  <Typography
                    as="span"
                    size="md"
                    weight="normal"
                    className="text-secondary-gray text-sm md:text-base"
                  >
                    {shift.time}
                  </Typography>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Typography as='p' size='sm' weight='medium' className="inline-block px-2 md:px-3 py-1 bg-light-blue/10 text-light-blue rounded-full text-xs md:text-sm">
                    {shift.experienceLevel}
                  </Typography>
                  {shift.specialty && (
                    <Typography as='p' size='sm' weight='medium' className="inline-block px-2 md:px-3 py-1 bg-light-blue/10 text-light-blue rounded-full text-xs md:text-sm">
                      {shift.specialty}
                    </Typography>
                  )}
                </div>
              </div>

              {/* Pay Rate */}
              <div className="text-left md:text-right shrink-0">
                <Typography
                  as="span"
                  size="h3"
                  weight="semibold"
                  className="text-dark-gray block leading-tight text-xl md:text-2xl"
                >
                  ${shift.payRate}
                </Typography>
                <Typography
                  as="p"
                  size="md"
                  weight="normal"
                  className="text-secondary-gray text-xs md:text-sm"
                >
                  AUD-Weekly
                </Typography>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-lighter-gray mb-4 md:mb-6" />

          {/* Shift Description Section */}
          <div className="mb-4 md:mb-6">
            <Typography
              as="h3"
              size="h5"
              weight="semibold"
              className="text-dark-gray mb-2 md:mb-3"
            >
              Shift Description
            </Typography>
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray leading-[18px] tracking-[-0.08px] text-sm md:text-base"
            >
              {shift.description ||
                'Provide general medical care to patients in a busy clinical setting. Responsibilities include consultations, diagnosis, and routine procedures.'}
            </Typography>
          </div>

          {/* Divider */}
          <div className="h-px bg-lighter-gray mb-4 md:mb-6" />

          {/* Hospital Overview Section */}
          <div>
            <Typography
              as="h3"
              size="h5"
              weight="semibold"
              className="text-dark-gray mb-2"
            >
              Hospital Overview
            </Typography>
            <Typography
              as="h4"
              size="lg"
              weight="normal"
              className="text-dark-gray mb-2 md:mb-3 leading-none text-sm md:text-base"
            >
              Basic information about the hiring facility
            </Typography>
            <Typography
              as="p"
              size="md"
              weight="normal"
              className="text-secondary-gray text-sm md:text-base"
            >
              {shift.hospitalOverview ||
                "St. Mary's Hospital is a well-established healthcare provider offering a wide range of medical services with modern facilities and a supportive clinical team."}
            </Typography>
          </div>
        </div>

        {/* Apply Button — pinned to bottom */}
        <div className="shrink-0 bg-white mb-30 px-3 md:px-4 pt-3 md:pt-4 pb-4 md:pb-6">
          <Button
            variant="primary"
            size="default"
            disabled={shift.hasConflict}
            className={`w-full h-12 md:h-10 rounded-xl text-sm md:text-base ${
              shift.hasConflict
                ? 'bg-primary-gray cursor-not-allowed opacity-100 hover:bg-primary-gray'
                : 'bg-light-blue hover:bg-light-blue/90'
            } text-white`}
          >
            Apply for Shift
          </Button>
          {shift.hasConflict && (
            <Typography
              as="p"
              size="sm"
              weight="normal"
              className="text-primary-gray text-center mt-2 text-xs leading-none px-2"
            >
              You cannot apply for this shift due to a schedule conflict with another accepted shift.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
