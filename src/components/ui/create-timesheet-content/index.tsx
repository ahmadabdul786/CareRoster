'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Icon } from '@iconify/react';
import { createTimesheetSchema, type CreateTimesheetFormData } from '@/schemas/createTimesheet.schema';
import { mockShifts } from '@/constants/mockShifts';
import { mockTimesheetShift } from '@/constants/mockTimesheet';

export function CreateTimesheetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const shiftId = searchParams.get('shiftId');
  const shift = shiftId ? mockShifts.find((s) => s.id === Number(shiftId)) : null;

  const shiftDate = shift?.date ?? mockTimesheetShift.date;
  const shiftMonth = shift?.month ?? mockTimesheetShift.month;
  const shiftYear = shift?.year ?? mockTimesheetShift.year;
  const shiftTitle = shift?.title ?? mockTimesheetShift.title;
  const shiftLocation = shift?.hospitalName ?? mockTimesheetShift.location;
  const shiftTime = shift?.time ?? mockTimesheetShift.time;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTimesheetFormData>({
    resolver: zodResolver(createTimesheetSchema),
    defaultValues: {
      totalHoursWorked: '',
      notes: '',
    },
  });

  const onSaveChanges = (data: CreateTimesheetFormData) => {
    console.log('Saving timesheet:', data);
    router.push('/doctor/my-timesheets');
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              Create Timesheet
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
              Enter your working hours for this shift
            </Typography>
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={handleSubmit(onSaveChanges)}
            className="whitespace-nowrap max-w-[166px]"
          >
            Save Changes
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSaveChanges)} className="space-y-6">
          <div className="flex flex-col lg:flex-row bg-soft-gray/40 rounded-xl">
            <div className="w-full lg:w-[380px] rounded-l-xl p-4 bg-soft-gray/40">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:user-circle" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Shift Details
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Read Only
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-full bg-white rounded-r-xl border border-soft-gray flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:px-4 sm:py-4">
                <div className="flex flex-col items-center justify-center w-[64px] h-[64px] bg-ultra-light-blue rounded-lg shrink-0">
                  <Typography as="p" size="h1" weight="semibold" className="text-dark-blue leading-[35px] text-center text-2xl">
                    {shiftDate}
                  </Typography>
                  <Typography as="p" size="md" weight="normal" className="text-dark-gray leading-6 text-center text-xs sm:text-md">
                    {shiftMonth}-{shiftYear}
                  </Typography>
                </div>

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <Typography as="p" size="md" weight="semibold" className="text-dark-gray leading-snug text-sm sm:text-md">
                    {shiftTitle}
                  </Typography>
                  <div className="flex items-center gap-1">
                    <Icon icon="ph:map-pin" className="w-3 h-3 sm:w-4 sm:h-4 text-light-blue shrink-0" />
                    <Typography as="p" size="md" weight="normal" className="text-light-blue leading-[18px] text-xs sm:text-md truncate">
                      {shiftLocation}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="ph:clock" className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-gray shrink-0" />
                    <Typography as="p" size="md" weight="normal" className="text-secondary-gray leading-[18px] text-xs sm:text-md">
                      {shiftTime}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row bg-soft-gray rounded-xl">
            <div className="w-full lg:w-[380px] rounded-l-xl p-4 bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:grid-nine" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Timesheet Details
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Fill in your working hours for this shift
                  </Typography>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-1.5 rounded-full border border-light-blue text-light-blue text-sm font-medium hover:bg-light-blue/5 transition-colors whitespace-nowrap"
              >
                Update
              </button>
            </div>

            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-3 space-y-4">
              <div>
                <label className="block mb-1">
                  <Typography as="span" size="md" weight="normal" className="text-dark-gray">
                    Total Hours Worked
                  </Typography>
                </label>
                <TextInputField
                  placeholder="8.00"
                  type="number"
                  min="0"
                  step="0.5"
                  {...register('totalHoursWorked')}
                />
                {errors.totalHoursWorked && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.totalHoursWorked.message}
                  </Typography>
                )}
              </div>

              <div>
                <label className="block mb-1">
                  <Typography as="span" size="md" weight="normal" className="text-dark-gray">
                    Notes
                  </Typography>
                </label>
                <textarea
                  {...register('notes')}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue min-h-[96px] resize-none text-secondary-gray"
                  placeholder="Completed all assigned consultations and routine checkups without issues"
                />
              </div>
            </div>
          </div>
        </form>
    </div>
  );
}
