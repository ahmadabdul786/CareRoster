'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { Icon } from '@iconify/react';
import { TextInputField } from '@/components/shared/text-input-field';
import { PhoneInput } from '@/components/shared/phone-input';
import { Dropdown } from '@/components/shared/dropdown';
import { hospitalProfileSchema, type HospitalProfileFormData } from '@/schemas/profile.schema';

export default function HospitalProfilePage() {
  const [editingSections, setEditingSections] = useState({
    organisation: false,
    location: false,
    additional: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    logo: 'Profile_Pic.jpg',
  });

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HospitalProfileFormData>({
    resolver: zodResolver(hospitalProfileSchema),
    defaultValues: {
      organisationName: "St. Mary's Hospital",
      abn: '12345678901',
      contactPersonName: 'John Smith',
      contactEmail: 'contact@stmaryhospital.com',
      phone: '0412345678',
      location: 'Sydney, NSW',
      state: 'NSW',
      organisationDescription: 'Private hospital providing emergency, surgical, and general medical services',
      facilityType: 'hospital',
    },
  });

  const formValues = watch();

  const onSubmit = (data: HospitalProfileFormData) => {
    console.log('Saving hospital profile data:', data);
    console.log('Uploaded files:', uploadedFiles);
  };

  const toggleSection = (section: keyof typeof editingSections) => {
    setEditingSections({ ...editingSections, [section]: !editingSections[section] });
  };

  const handleFileUpload = (field: 'logo', file: File) => {
    setUploadedFiles({ ...uploadedFiles, [field]: file.name });
  };

  const handleFileDelete = (field: 'logo') => {
    setUploadedFiles({ ...uploadedFiles, [field]: '' });
  };

  return (
    <DashboardLayout role="hospital">
      <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1 text-[32px]">
              Edit Profile
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
              Update your organisation details
            </Typography>
          </div>
          <Button 
            variant="outline" 
            size="default" 
            onClick={handleSubmit(onSubmit)}
            className="whitespace-nowrap max-w-[166px]"
          >
            Save Changes
          </Button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Organisation Details Section */}
          <div className="flex flex-col lg:flex-row h-full bg-soft-gray rounded-xl">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] h-full rounded-l-xl p-4 bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:buildings" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Organisation Details
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Legal and primary contact information for your organisation
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('organisation')}>
                  {editingSections.organisation ? 'Cancel' : 'Update'}
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Optional details to enhance your organisation profile
                  </Typography>
                </label>
                <TextInputField
                  placeholder="St. Mary's Hospital"
                  {...register('organisationName')}
                  disabled={!editingSections.organisation}
                />
                {errors.organisationName && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.organisationName.message}
                  </Typography>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      ABN
                    </Typography>
                  </label>
                  <TextInputField
                    placeholder="12 345 678 901"
                    {...register('abn')}
                    disabled={!editingSections.organisation}
                  />
                  {errors.abn && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.abn.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Contact Person Name
                    </Typography>
                  </label>
                  <TextInputField
                    placeholder="John Smith"
                    {...register('contactPersonName')}
                    disabled={!editingSections.organisation}
                  />
                  {errors.contactPersonName && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.contactPersonName.message}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Contact Email
                    </Typography>
                  </label>
                  <TextInputField
                    type="email"
                    placeholder="contact@stmaryhospital.com"
                    {...register('contactEmail')}
                    disabled={!editingSections.organisation}
                  />
                  {errors.contactEmail && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.contactEmail.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Phone Number*
                    </Typography>
                  </label>
                  <PhoneInput
                    id="phone"
                    label=""
                    value={formValues.phone}
                    onChange={(value) => setValue('phone', value)}
                    disabled={!editingSections.organisation}
                  />
                  {errors.phone && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location Details Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:map-pin" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Location Details
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Address and state information used for shift listings and filtering
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('location')}>
                  {editingSections.location ? 'Cancel' : 'Update'}
                </Button>
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
                  disabled={!editingSections.location}
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
                  disabled={!editingSections.location}
                />
                {errors.state && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.state.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:info" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Additional Information
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Optional details to enhance your organisation profile
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('additional')}>
                  {editingSections.additional ? 'Cancel' : 'Update'}
                </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Logo
                  </Typography>
                </label>
                {uploadedFiles.logo ? (
                  <div className="border border-soft-gray rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon icon="ph:file-image" className="w-6 h-6 text-secondary-gray" />
                      <div>
                        <Typography as="p" size="sm" weight="medium" className="text-dark-gray">
                          {uploadedFiles.logo}
                        </Typography>
                        <Typography as="p" size="sm" weight="normal" className="text-secondary-gray">
                          10.2mb
                        </Typography>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="text-secondary-gray hover:text-alert-red disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleFileDelete('logo')}
                      disabled={!editingSections.additional}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center ${editingSections.additional ? 'cursor-pointer hover:border-light-blue' : 'cursor-not-allowed opacity-50'} transition-colors`}>
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload logo
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={!editingSections.additional}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('logo', file);
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Organisation Description
                  </Typography>
                </label>
                <textarea
                  {...register('organisationDescription')}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue min-h-[120px] resize-none text-secondary-gray disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Private hospital providing emergency, surgical, and general medical services"
                  disabled={!editingSections.additional}
                />
                {errors.organisationDescription && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.organisationDescription.message}
                  </Typography>
                )}
              </div>

              <div>
                <Dropdown
                  id="facility-type"
                  label="Facility Type"
                  placeholder="Select Facility Type"
                  options={[
                    { value: 'hospital', label: 'Hospital' },
                    { value: 'clinic', label: 'Clinic' },
                    { value: 'medical-center', label: 'Medical Center' },
                    { value: 'aged-care', label: 'Aged Care Facility' },
                  ]}
                  value={formValues.facilityType}
                  onChange={(value) => setValue('facilityType', value)}
                  disabled={!editingSections.additional}
                />
                {errors.facilityType && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.facilityType.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
