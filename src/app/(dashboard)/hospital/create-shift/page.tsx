'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { Icon } from '@iconify/react';
import { TextInputField } from '@/components/shared/text-input-field';
import { Dropdown } from '@/components/shared/dropdown';
import { createShiftSchema, type CreateShiftFormData } from '@/schemas/createShift.schema';

export default function CreateShiftPage() {
  const [editingSections, setEditingSections] = useState({
    shiftDetails: false,
    schedule: false,
    location: false,
    compensation: false,
  });

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateShiftFormData>({
    resolver: zodResolver(createShiftSchema),
    defaultValues: {
      shiftTitle: '',
      description: '',
      requiredSpecialty: '',
      requiredExperienceLevel: '',
      timezone: '',
      date: '',
      startTime: '',
      endTime: '',
      location: 'Sydney, NSW',
      state: 'NSW',
      payRate: '',
    },
  });

  const formValues = watch();

  const onSaveDraft = () => {
    console.log('Saving as draft:', formValues);
  };

  const onPublish = (data: CreateShiftFormData) => {
    console.log('Publishing shift:', data);
  };

  const toggleSection = (section: keyof typeof editingSections) => {
    setEditingSections({ ...editingSections, [section]: !editingSections[section] });
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              Create Shift
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
              Add shift details and publish after payment
            </Typography>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="default" 
              onClick={onSaveDraft}
              className="whitespace-nowrap"
            >
              Save as Draft
            </Button>
            <Button 
              variant="primary" 
              size="default" 
              onClick={handleSubmit(onPublish)}
              className="whitespace-nowrap"
            >
              Publish & Pay
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onPublish)} className="space-y-6">
          {/* Shift Details Section */}
          <div className="flex flex-col lg:flex-row h-full bg-soft-gray rounded-xl">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] h-full rounded-l-xl p-4 bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:info" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Shift Details
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Enter key information about the shift and requirements
                  </Typography>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Shift Title
                  </Typography>
                </label>
                <TextInputField
                  placeholder="e.g. Night Shift - ED Registrar"
                  {...register('shiftTitle')}
                />
                {errors.shiftTitle && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.shiftTitle.message}
                  </Typography>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Description
                  </Typography>
                </label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue min-h-[120px] resize-none text-secondary-gray"
                  placeholder="Enter duties, requirements, clinical expectations, and additional notes"
                />
                {errors.description && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.description.message}
                  </Typography>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Dropdown
                    id="required-specialty"
                    label="Required Specialty"
                    placeholder="Select specialty"
                    options={[
                      { value: 'general-practitioner', label: 'General Practitioner' },
                      { value: 'emergency-medicine', label: 'Emergency Medicine' },
                      { value: 'anaesthetics', label: 'Anaesthetics' },
                      { value: 'surgery', label: 'Surgery' },
                      { value: 'internal-medicine', label: 'Internal Medicine' },
                    ]}
                    value={formValues.requiredSpecialty}
                    onChange={(value) => setValue('requiredSpecialty', value)}
                  />
                  {errors.requiredSpecialty && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.requiredSpecialty.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Dropdown
                    id="required-experience-level"
                    label="Required Experience Level"
                    placeholder="Select experience level"
                    options={[
                      { value: 'intern', label: 'Intern' },
                      { value: 'resident', label: 'Resident' },
                      { value: 'registrar', label: 'Registrar' },
                      { value: 'consultant', label: 'Consultant' },
                      { value: 'fellow', label: 'Fellow' },
                    ]}
                    value={formValues.requiredExperienceLevel}
                    onChange={(value) => setValue('requiredExperienceLevel', value)}
                  />
                  {errors.requiredExperienceLevel && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.requiredExperienceLevel.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:calendar" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Schedule
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Set date, time, and timezone for the shift
                  </Typography>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Dropdown
                    id="timezone"
                    label="Timezone"
                    placeholder="Select timezone"
                    options={[
                      { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' },
                      { value: 'ACST', label: 'ACST (Australian Central Standard Time)' },
                      { value: 'AWST', label: 'AWST (Australian Western Standard Time)' },
                    ]}
                    value={formValues.timezone}
                    onChange={(value) => setValue('timezone', value)}
                  />
                  {errors.timezone && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.timezone.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Date
                    </Typography>
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full h-[48px] px-4 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue text-secondary-gray"
                  />
                  {errors.date && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.date.message}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Start Time
                    </Typography>
                  </label>
                  <input
                    type="time"
                    {...register('startTime')}
                    className="w-full h-[48px] px-4 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue text-secondary-gray"
                  />
                  {errors.startTime && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.startTime.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      End Time
                    </Typography>
                  </label>
                  <input
                    type="time"
                    {...register('endTime')}
                    className="w-full h-[48px] px-4 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue text-secondary-gray"
                  />
                  {errors.endTime && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.endTime.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:map-pin" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Location
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Work location from your profile (editable)
                  </Typography>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Location
                  </Typography>
                </label>
                <TextInputField
                  placeholder="Sydney, NSW"
                  {...register('location')}
                />
                {errors.location && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.location.message}
                  </Typography>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    State
                  </Typography>
                </label>
                <TextInputField
                  placeholder="NSW"
                  {...register('state')}
                />
                {errors.state && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.state.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:currency-dollar" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Compensation
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Define the hourly pay rate in AUD.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Pay Rate
                  </Typography>
                </label>
                <TextInputField
                  placeholder="e.g. 150"
                  {...register('payRate')}
                />
                {errors.payRate && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.payRate.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </form>
    </div>
  );
}
