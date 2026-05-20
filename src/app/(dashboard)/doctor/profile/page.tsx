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
import { doctorProfileSchema, type DoctorProfileFormData } from '@/schemas/profile.schema';

export default function DoctorProfilePage() {
  const [editingSections, setEditingSections] = useState({
    personal: false,
    professional: false,
    workLocation: false,
    additional: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    profilePhoto: 'Document_name.pdf',
    medicalDegree: 'degree_certificate.pdf',
    insurance: 'insurance_document.pdf',
  });

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      fullName: 'Dr. John Smith',
      email: 'john.smith@email.com',
      phone: '0412345678',
      ahpraNumber: 'MED1234567',
      specialty: 'general-practitioner',
      experienceLevel: 'registrar',
      location: 'Sydney, NSW',
      preferredPayRate: '150',
      profileBio: 'Experienced general practitioner with over 5 years of clinical practice in both urban and regional healthcare settings.',
      abn: '12345678901',
    },
  });

  const formValues = watch();

  const onSubmit = (data: DoctorProfileFormData) => {
    console.log('Saving profile data:', data);
    console.log('Uploaded files:', uploadedFiles);
  };

  const toggleSection = (section: keyof typeof editingSections) => {
    setEditingSections({ ...editingSections, [section]: !editingSections[section] });
  };

  const handleFileUpload = (field: 'profilePhoto' | 'medicalDegree' | 'insurance', file: File) => {
    setUploadedFiles({ ...uploadedFiles, [field]: file.name });
  };

  const handleFileDelete = (field: 'profilePhoto' | 'medicalDegree' | 'insurance') => {
    setUploadedFiles({ ...uploadedFiles, [field]: '' });
  };

  return (
    <DashboardLayout role="doctor">
      <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
              Edit Profile
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
              Update your personal and professional details
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
          {/* Personal Information Section */}
          <div className="flex flex-col lg:flex-row h-full bg-soft-gray rounded-xl ">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px] h-full rounded-l-xl p-4 bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:user-circle" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Personal Information
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Update your basic contact details
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('personal')}>
                {editingSections.personal ? 'Cancel' : 'Update'}
              </Button>
              </div>
                
              
              
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Full Name
                  </Typography>
                </label>
                <TextInputField
                  placeholder="Dr. John Smith"
                  {...register('fullName')}
                  disabled={!editingSections.personal}
                />
                {errors.fullName && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.fullName.message}
                  </Typography>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Email
                    </Typography>
                  </label>
                  <TextInputField
                    type="email"
                    placeholder="john.smith@email.com"
                    {...register('email')}
                    disabled={!editingSections.personal}
                  />
                  {errors.email && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.email.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Phone Number
                    </Typography>
                  </label>
                  <PhoneInput
                    id="phone"
                    label=""
                    value={formValues.phone}
                    onChange={(value) => setValue('phone', value)}
                    disabled={!editingSections.personal}
                  />
                  {errors.phone && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Profile Photo
                  </Typography>
                </label>
                {uploadedFiles.profilePhoto ? (
                  <div className="border border-soft-gray rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon icon="ph:file-pdf" className="w-6 h-6 text-secondary-gray" />
                      <div>
                        <Typography as="p" size="sm" weight="medium" className="text-dark-gray">
                          {uploadedFiles.profilePhoto}
                        </Typography>
                        <Typography as="p" size="sm" weight="normal" className="text-secondary-gray">
                          1.5mb
                        </Typography>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="text-secondary-gray hover:text-alert-red disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleFileDelete('profilePhoto')}
                      disabled={!editingSections.personal}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center ${editingSections.personal ? 'cursor-pointer hover:border-light-blue' : 'cursor-not-allowed opacity-50'} transition-colors`}>
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload profile photo
                    </Typography>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      disabled={!editingSections.personal}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('profilePhoto', file);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray ">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px]  rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:first-aid" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Professional Information
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Manage your qualifications and professional credentials.
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('professional')}>
                {editingSections.professional ? 'Cancel' : 'Update'}
              </Button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-r-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    AHPRA Registration Number
                  </Typography>
                </label>
                <TextInputField
                  placeholder="MED1234567"
                  {...register('ahpraNumber')}
                  disabled={!editingSections.professional}
                />
                {errors.ahpraNumber && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.ahpraNumber.message}
                  </Typography>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Dropdown
                    id="specialty"
                    label="Specialty"
                    placeholder="Select Specialty"
                    options={[
                      { value: 'general-practitioner', label: 'General Practitioner' },
                      { value: 'emergency-medicine', label: 'Emergency Medicine' },
                      { value: 'anaesthetics', label: 'Anaesthetics' },
                    ]}
                    value={formValues.specialty}
                    onChange={(value) => setValue('specialty', value)}
                    disabled={!editingSections.professional}
                  />
                  {errors.specialty && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.specialty.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <Dropdown
                    id="experience-level"
                    label="Experience Level"
                    placeholder="Select Experience Level"
                    options={[
                      { value: 'registrar', label: 'Registrar' },
                      { value: 'consultant', label: 'Consultant' },
                      { value: 'fellow', label: 'Fellow' },
                    ]}
                    value={formValues.experienceLevel}
                    onChange={(value) => setValue('experienceLevel', value)}
                    disabled={!editingSections.professional}
                  />
                  {errors.experienceLevel && (
                    <Typography as="p" size="sm" className="text-alert-red mt-1">
                      {errors.experienceLevel.message}
                    </Typography>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Medical Degree Certificate
                  </Typography>
                </label>
                {uploadedFiles.medicalDegree ? (
                  <div className="border border-soft-gray rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon icon="ph:file-pdf" className="w-6 h-6 text-secondary-gray" />
                      <div>
                        <Typography as="p" size="sm" weight="medium" className="text-dark-gray">
                          {uploadedFiles.medicalDegree}
                        </Typography>
                        <Typography as="p" size="sm" weight="normal" className="text-secondary-gray">
                          1.5mb
                        </Typography>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="text-secondary-gray hover:text-alert-red disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleFileDelete('medicalDegree')}
                      disabled={!editingSections.professional}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center ${editingSections.professional ? 'cursor-pointer hover:border-light-blue' : 'cursor-not-allowed opacity-50'} transition-colors`}>
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload certificate
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      disabled={!editingSections.professional}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('medicalDegree', file);
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Professional Indemnity Insurance
                  </Typography>
                </label>
                {uploadedFiles.insurance ? (
                  <div className="border border-soft-gray rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon icon="ph:file-pdf" className="w-6 h-6 text-secondary-gray" />
                      <div>
                        <Typography as="p" size="sm" weight="medium" className="text-dark-gray">
                          {uploadedFiles.insurance}
                        </Typography>
                        <Typography as="p" size="sm" weight="normal" className="text-secondary-gray">
                          1.5mb
                        </Typography>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="text-secondary-gray hover:text-alert-red disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleFileDelete('insurance')}
                      disabled={!editingSections.professional}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center ${editingSections.professional ? 'cursor-pointer hover:border-light-blue' : 'cursor-not-allowed opacity-50'} transition-colors`}>
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload insurance document
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      disabled={!editingSections.professional}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('insurance', file);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Work & Location Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px]  rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:map-pin" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Work & Location
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Set your location and preferred pay rate.
                  </Typography>
                </div>
              </div>
              <div className='w-[100px] ml-12 mt-6'>
                <Button variant="outline" size="xs" type="button" onClick={() => toggleSection('workLocation')}>
                {editingSections.workLocation ? 'Cancel' : 'Update'}
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
                  disabled={!editingSections.workLocation}
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
                    Preferred Pay Rate (AUD/hour)
                  </Typography>
                </label>
                <TextInputField
                  placeholder="Preferred Pay Rate (AUD/hour)"
                  {...register('preferredPayRate')}
                  disabled={!editingSections.workLocation}
                />
                {errors.preferredPayRate && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.preferredPayRate.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="flex flex-col lg:flex-row rounded-xl bg-soft-gray">
            {/* Section Header Card */}
            <div className="w-full lg:w-[380px]  rounded-xl p-4 h-fit bg-soft-gray/40">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon icon="ph:info" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="span" size="lg" weight="medium" className="text-light-blue">
                    Additional Information
                  </Typography>
                  <Typography as="p" size="lg" weight="normal" className="text-dark-gray mt-1">
                    Add optional details to complete your profile
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
                    Profile Bio
                  </Typography>
                </label>
                <textarea
                  {...register('profileBio')}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue min-h-[120px] resize-none text-secondary-gray disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Experienced general practitioner with over 5 years of clinical practice in both urban and regional healthcare settings."
                  disabled={!editingSections.additional}
                />
                {errors.profileBio && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.profileBio.message}
                  </Typography>
                )}
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    ABN
                  </Typography>
                </label>
                <TextInputField
                  placeholder="12345678901"
                  {...register('abn')}
                  disabled={!editingSections.additional}
                />
                {errors.abn && (
                  <Typography as="p" size="sm" className="text-alert-red mt-1">
                    {errors.abn.message}
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
