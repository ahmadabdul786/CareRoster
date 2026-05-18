'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { Icon } from '@iconify/react';
import { Dropdown } from '@/components/shared/dropdown';
import { DatePicker } from '@/components/shared/date-picker';
import { Pagination } from '@/components/shared/pagination';
import { browseShiftsFilterSchema, type BrowseShiftsFilterFormData } from '@/schemas/browse-shifts.schema';

// Mock data for shifts
const mockShifts = [
  {
    id: 1,
    title: 'General Practitioner - Morning Shift',
    hospital: "St. Mary's Hospital Sydney, NSW",
    date: '27',
    month: 'OCT-26',
    time: '08:00 AM - 02:00 PM',
    experienceLevel: 'Registrar',
    payRate: 150,
  },
  {
    id: 2,
    title: 'General Practitioner - Morning Shift',
    hospital: "St. Mary's Hospital Sydney, NSW",
    date: '25',
    month: 'OCT-26',
    time: '08:00 AM - 02:00 PM',
    experienceLevel: 'Registrar',
    payRate: 150,
  },
  {
    id: 3,
    title: 'General Practitioner - Morning Shift',
    hospital: "St. Mary's Hospital Sydney, NSW",
    date: '22',
    month: 'OCT-26',
    time: '08:00 AM - 02:00 PM',
    experienceLevel: 'Registrar',
    payRate: 150,
  },
  {
    id: 4,
    title: 'General Practitioner - Morning Shift',
    hospital: "St. Mary's Hospital Sydney, NSW",
    date: '21',
    month: 'OCT-26',
    time: '08:00 AM - 02:00 PM',
    experienceLevel: 'Registrar',
    payRate: 150,
  },
  {
    id: 5,
    title: 'General Practitioner - Morning Shift',
    hospital: "St. Mary's Hospital Sydney, NSW",
    date: '19',
    month: 'OCT-26',
    time: '08:00 AM - 02:00 PM',
    experienceLevel: 'Registrar',
    payRate: 150,
  },
];

type SortOption = 'newest' | 'soonest' | 'highest-pay';

export default function BrowseShiftsPage() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BrowseShiftsFilterFormData>({
    resolver: zodResolver(browseShiftsFilterSchema),
    defaultValues: {
      location: '',
      citySearch: '',
      specialty: '',
      experienceLevel: [],
      dateFrom: '',
      dateTo: '',
      minPayRate: '',
      maxPayRate: '',
    },
  });

  const experienceLevel = watch('experienceLevel');

  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24; // Calculate based on your data

  const handleExperienceLevelToggle = (level: string) => {
    const currentLevels = experienceLevel || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];
    setValue('experienceLevel', newLevels);
  };

  const handleClearFilters = () => {
    reset();
  };

  const onSubmit = (data: BrowseShiftsFilterFormData) => {
    console.log('Applying filters:', data);
    // Add your filter logic here
  };

  return (
    <DashboardLayout role="doctor">
      <div className="p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2">
            Browse Shifts
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            Find and apply for available locum shifts
          </Typography>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-[334px] shrink-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white border border-soft-gray rounded-xl sticky top-6 h-[823px] justify-between flex flex-col overflow-hidden">
          
                <div className="flex flex-col gap-3  p-3">
               
                  {/* Filters Header */}
                  <div className="flex items-center justify-between ">
                    <Typography as="h3" size="lg" weight="semibold" className="text-dark-gray text-lg leading-none">
                      Filters
                    </Typography>
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="flex items-center gap-2.5 px-4 py-1 border border-soft-gray rounded-xl text-primary-gray hover:text-dark-gray transition-colors h-7"
                    >
                      <Icon icon="ph:x" className="w-4 text-primary-gray h-4" />
                      <Typography as="span" size="sm" weight="medium" className="text-sm text-primary-gray leading-5">
                        Clear
                      </Typography>
                    </button>
                  </div>
                  
                  <div className='flex flex-col gap-6'>
                    {/* Location Dropdown */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray  block  leading-5 mb-1">
                        Location
                      </Typography>
                      <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            id="location"
                            label=""
                            placeholder="state"
                            options={[
                              { value: 'nsw', label: 'NSW' },
                              { value: 'vic', label: 'VIC' },
                              { value: 'qld', label: 'QLD' },
                              { value: 'wa', label: 'WA' },
                              { value: 'sa', label: 'SA' },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.location && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.location.message}
                        </Typography>
                      )}
                    </div>

                    {/* City/Suburb Search */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray  block  leading-5 mb-1">
                        City/suburb search
                      </Typography>
                      <Controller
                        name="citySearch"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search"
                              {...field}
                              className="w-full h-12 px-4 py-3 border border-soft-gray rounded-2xl text-base pr-10"
                            />
                            <Icon
                              icon="ph:magnifying-glass"
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-gray"
                            />
                          </div>
                        )}
                      />
                      {errors.citySearch && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.citySearch.message}
                        </Typography>
                      )}
                    </div>

                    {/* Specialty Dropdown */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray  block  leading-5 mb-1" >
                        Specialty
                      </Typography>
                      <Controller
                        name="specialty"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            id="specialty"
                            label=""
                            placeholder="Select"
                            options={[
                              { value: 'general-practitioner', label: 'General Practitioner' },
                              { value: 'emergency-medicine', label: 'Emergency Medicine' },
                              { value: 'anaesthetics', label: 'Anaesthetics' },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.specialty && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.specialty.message}
                        </Typography>
                      )}
                    </div>

                    {/* Experience Level */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray mb-1 block  leading-5">
                        Experience Level
                      </Typography>
                      <div className="flex gap-2 flex-wrap">
                        {['Junior', 'Registrar', 'Consultant'].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => handleExperienceLevelToggle(level)}
                            className={`px-4 py-1 h-7 border rounded-xl leading-5 transition-colors ${
                              experienceLevel?.includes(level)
                                ? 'bg-light-blue/10 text-light-blue border-light-blue/50'
                                : 'bg-white text-dark-gray border-light-blue/50'
                            }`}
                            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '20px' }}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                      {errors.experienceLevel && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.experienceLevel.message}
                        </Typography>
                      )}
                    </div>

                    {/* Date Range */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray mb-1 block leading-5">
                        Date Range
                      </Typography>
                      <div className="flex items-center gap-1">
                        <Controller
                          name="dateFrom"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <span className="text-soft-gray">—</span>
                        <Controller
                          name="dateTo"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      {(errors.dateFrom || errors.dateTo) && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.dateFrom?.message || errors.dateTo?.message}
                        </Typography>
                      )}
                    </div>

                    {/* Pay Rate */}
                    <div className="">
                      <Typography as="label" size="md" weight="normal" className="text-dark-gray  block  leading-5 mb-1">
                        Pay Rate
                      </Typography>
                      <div className="flex gap-2">
                        <Controller
                          name="minPayRate"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              placeholder="Min Pay Rate"
                              {...field}
                              className="flex-1 h-[48px] w-[145px] px-4 border border-soft-gray rounded-2xl text-lg"
                            />
                          )}
                        />
                        <Controller
                          name="maxPayRate"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              placeholder="Max Pay Rate"
                              {...field}
                              className="flex-1 h-[48px] w-[145px] px-4 border border-soft-gray rounded-2xl text-lg"
                            />
                          )}
                        />
                      </div>
                      {(errors.minPayRate || errors.maxPayRate) && (
                        <Typography as="p" size="sm" weight="normal" className="text-alert-red mt-1">
                          {errors.minPayRate?.message || errors.maxPayRate?.message}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>

                {/* Apply Filter Button - Fixed at bottom */}
                <div className="p-6 pt-4  border-soft-gray shrink-0">
                  <Button
                    variant="outline"
                    size="default"
                    type="submit"
                    className="w-full"
                  >
                    Apply Filter
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Content - Shift Listings */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className=" mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <Typography as="h4" size="xl" weight="semibold" className="text-dark-gray">
                    Showing Available Shifts
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
                    According to your Criteria
                  </Typography>
                </div>
                <div className="flex gap-2 px-2 py-1 rounded-xl bg-white">
                  <button
                    type="button"
                    onClick={() => setSortBy('newest')}
                    className={`px-4 py-4 rounded-xl text-md transition-colors ${
                      sortBy === 'newest'
                        ? 'bg-light-blue/50 '
                        : ' text-secondary-gray '
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('soonest')}
                    className={`px-4 py-4 rounded-xl text-md transition-colors ${
                      sortBy === 'soonest'
                        ? 'bg-light-blue/50 '
                        : ' text-dark-gray '
                    }`}
                  >
                    Soonest
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('highest-pay')}
                    className={`px-4 py-4 rounded-xl text-md transition-colors ${
                      sortBy === 'highest-pay'
                        ? 'bg-light-blue/50 '
                        : 'text-dark-gray'
                    }`}
                  >
                    Highest Pay
                  </button>
                </div>
              </div>
            </div>

            {/* Shift Cards */}
            <div className="space-y-4">
              {mockShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="bg-white border border-soft-gray rounded-xl p-6 flex items-center gap-6"
                >
                  {/* Date Badge */}
                  <div className="w-24 h-24 bg-light-blue/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <Typography as="span" size="h1" weight="bold" className="text-light-blue">
                      {shift.date}
                    </Typography>
                    <Typography as="span" size="sm" weight="normal" className="text-secondary-gray">
                      {shift.month}
                    </Typography>
                  </div>

                  {/* Shift Details */}
                  <div className="flex-1">
                    <Typography as="h4" size="md" weight="semibold" className="text-dark-gray mb-2">
                      {shift.title}
                    </Typography>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon icon="ph:map-pin" className="w-4 h-4 text-light-blue" />
                      <Typography as="span" size="md" weight="normal" className="text-light-blue">
                        {shift.hospital}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="ph:clock" className="w-4 h-4 text-secondary-gray" />
                      <Typography as="span" size="md" weight="normal" className="text-secondary-gray">
                        {shift.time}
                      </Typography>
                    </div>
                    <span className="inline-block px-3 py-1 bg-light-blue/8 text-light-blue rounded-full text-sm">
                      {shift.experienceLevel}
                    </span>
                  </div>

                  {/* Pay Rate and Apply Button */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <Typography as="span" size="h3" weight="semibold" className="text-dark-gray">
                        ${shift.payRate}
                      </Typography>
                      <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
                        AUD-Weekly
                      </Typography>
                    </div>
                    <button 
                      type="button"
                      className="w-[123px] h-6 py-3 px-6 border border-light-blue text-light-blue rounded-xl font-medium text-sm whitespace-nowrap flex items-center justify-center hover:bg-light-blue/5 transition-colors"
                      style={{ fontFamily: 'Poppins', fontSize: '14px', lineHeight: '20px' }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                itemsPerPageOptions={[10, 20, 50]}
                showItemsPerPage={true}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
