'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { Icon } from '@iconify/react';
import { MapPinIcon, ClockIcon } from '@phosphor-icons/react';
import { Dropdown } from '@/components/shared/dropdown';
import { CitySuburbSearch } from '@/components/shared/city-suburb-search';
import { DatePicker } from '@/components/shared/date-picker';
import { Pagination } from '@/components/shared/pagination';
import { browseShiftsFilterSchema, type BrowseShiftsFilterFormData } from '@/schemas/browse-shifts.schema';
import { ShiftDetailsDialog } from '@/components/ui/shift-details-dialog';
import { TabToggle } from '@/components/ui/tab-toggle';
import { mockBrowseShifts } from '@/constants/mockBrowseShifts';
import type { BrowseShift } from '@/types/doctor';

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
  const [selectedShift, setSelectedShift] = useState<BrowseShift | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleShiftClick = (shift: BrowseShift) => {
    setSelectedShift(shift);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedShift(null), 300); // Clear after animation
  };

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
    <div className="flex flex-col h-full min-h-0 p-3 md:p-6 bg-light-gray/30 xl:overflow-hidden">
        {/* Header */}
        <div className="mb-4 md:mb-6 shrink-0">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-2 ">
            Browse Shifts
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm md:text-base">
            Find and apply for available locum shifts
          </Typography>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="xl:hidden w-full mb-4 shrink-0 flex items-center justify-between px-4 py-3 bg-white border border-primary-gray rounded-xl text-dark-gray"
        >
          <div className="flex items-center gap-2">
            <Icon icon="ph:funnel" className="w-5 h-5" />
            <Typography as="span" size="md" weight="medium">
              Filters
            </Typography>
          </div>
          <Icon icon={showFilters ? "ph:caret-up" : "ph:caret-down"} className="w-5 h-5" />
        </button>

        <div className="flex flex-1 min-h-0 flex-col xl:flex-row gap-4 md:gap-6">
          {/* Left Sidebar - Filters */}
          <div className={`w-full xl:w-[334px] xl:shrink-0 xl:flex xl:flex-col xl:min-h-0 ${showFilters ? 'block' : 'hidden xl:flex'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="xl:flex xl:flex-col xl:min-h-0 xl:flex-1">
              <div className="bg-white border border-soft-gray rounded-xl flex flex-col overflow-hidden xl:flex-1 xl:min-h-0">
                <div className="flex flex-col gap-3 p-3 overflow-y-auto flex-1 min-h-0">
               
                  {/* Filters Header */}
                  <div className="flex items-center justify-between ">
                    <Typography as="h4" size="h4" weight="semibold" className="text-dark-gray leading-none">
                      Filters
                    </Typography>
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="flex items-center gap-2.5 px-4 py-1 border border-primary-gray rounded-xl text-primary-gray hover:text-dark-gray transition-colors h-7"
                    >
                      <Icon icon="ph:x" className="w-4 h-4 text-primary-gray" />
                      <Typography as="span" size="md" weight="medium" className=" text-primary-gray leading-5">
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
                          <CitySuburbSearch
                            id="citySearch"
                            value={field.value}
                            onChange={field.onChange}
                          />
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
                              className="flex-1 h-[48px] w-[145px] px-4 border border-primary-gray rounded-2xl text-lg outline-none focus:border-light-blue transition-colors"
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
                              className="flex-1 h-[48px] w-[145px] px-4 border border-primary-gray rounded-2xl text-lg outline-none focus:border-light-blue transition-colors"
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
                <div className="p-6 pt-4  shrink-0">
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
          <div className="flex-1 w-full min-h-0 xl:overflow-y-auto">
            {/* Sort Options */}
            <div className="mb-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
                <div>
                  <Typography as="h4" size="xl" weight="semibold" className="text-dark-gray text-base lg:text-xl">
                    Showing Available Shifts
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-secondary-gray text-sm lg:text-base">
                    According to your Criteria
                  </Typography>
                </div>
                <TabToggle
                  options={[
                    { value: 'newest', label: 'Newest' },
                    { value: 'soonest', label: 'Soonest' },
                    { value: 'highest-pay', label: 'Highest Pay' },
                  ]}
                  active={sortBy}
                  onChange={setSortBy}
                  className="overflow-x-auto"
                />
              </div>
            </div>

            {/* Shift Cards */}
            <div className="space-y-3 md:space-y-4">
              {mockBrowseShifts.map((shift) => (
                <div
                  key={shift.id}
                  onClick={() => handleShiftClick(shift)}
                  className="bg-white border border-soft-gray rounded-xl p-2 lg:p-3 xl:p-4 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 xl:gap-6 cursor-pointer hover:border-light-blue hover:shadow-md transition-all"
                >
                  {/* Date Badge and Details Container */}
                  <div className="flex items-start gap-3 lg:gap-4 flex-1 w-full">
                    {/* Date Badge */}
                    <div className="w-16 h-16 lg:w-20.5 lg:h-20.5 xl:w-24.5 xl:h-24.5 bg-light-blue/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <Typography as="span" size="h1" weight="semibold" className="text-light-blue ">
                        {shift.date}
                      </Typography>
                      <Typography as="span" size="md" weight="normal" className="text-dark-gray ">
                        {shift.month}
                      </Typography>
                    </div>

                    {/* Shift Details */}
                    <div className="flex-1 min-w-0">
                      <Typography as="h6" size="md" weight="semibold" className="text-dark-gray mb-1 lg:mb-2 ">
                        {shift.title}
                      </Typography>
                      <div className="flex items-start gap-2 mb-1">
                        <MapPinIcon weight="bold" className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-light-blue shrink-0 mt-0.5" />
                        <Typography as="span" size="md" weight="normal" className="text-light-blue  break-words">
                          {shift.hospital}
                        </Typography>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon weight="bold" className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-secondary-gray" />
                        <Typography as="span" size="md" weight="normal" className="text-secondary-gray ">
                          {shift.time}
                        </Typography>
                      </div>
                      <Typography as= 'span' size= 'sm'  className="inline-block px-2 lg:px-3 py-0.5 lg:py-1 bg-light-blue/8 text-light-blue rounded-full ">
                        {shift.experienceLevel}
                      </Typography>
                    </div>
                  </div>

                  {/* Pay Rate and Apply Button */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 w-full lg:w-auto">
                    <div className="text-left lg:text-right">
                      <Typography as="span" size="h3" weight="semibold" className="text-dark-gray ">
                        ${shift.payRate}
                      </Typography>
                      <Typography as="p" size="md" weight="normal" className="text-secondary-gray ">
                        AUD-Weekly
                      </Typography>
                    </div>
                    <Button  type="button"
                      variant="primary"
                      size="shift"
                      onClick={() => handleShiftClick(shift)}
                    >
                      Apply Now
                    </Button>
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

        {/* Shift Details Dialog */}
        <ShiftDetailsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          shift={selectedShift}
        />
    </div>
  );
}
