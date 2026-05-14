'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { Typography } from '@/components/shared/typography';
import { Button } from '@/components/shared/button';
import { Icon } from '@iconify/react';
import { TextInputField } from '@/components/shared/text-input-field';
import { PhoneInput } from '@/components/shared/phone-input';

export default function DoctorProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. John Smith',
    email: 'john.smith@email.com',
    phone: '',
    profilePhoto: null as File | null,
    ahpraNumber: 'MED1234567',
    specialty: 'General Practitioner',
    experienceLevel: 'Registrar',
    medicalDegree: null as File | null,
    insurance: null as File | null,
    location: 'Sydney, NSW',
    preferredPayRate: '',
    profileBio: 'Experienced general practitioner with over 5 years of clinical practice in both urban and regional healthcare settings.',
    abn: '12345678901',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    profilePhoto: 'Document_name.pdf',
    medicalDegree: 'degree_certificate.pdf',
    insurance: 'insurance_document.pdf',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile data:', profileData);
  };

  const handleFileUpload = (field: 'profilePhoto' | 'medicalDegree' | 'insurance', file: File) => {
    setProfileData({ ...profileData, [field]: file });
    setUploadedFiles({ ...uploadedFiles, [field]: file.name });
  };

  const handleFileDelete = (field: 'profilePhoto' | 'medicalDegree' | 'insurance') => {
    setProfileData({ ...profileData, [field]: null });
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
            onClick={handleSave}
            className="whitespace-nowrap"
          >
            Save Changes
          </Button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Information Section */}
          <div className="flex flex-col lg:flex-row h-full bg-soft-gray rounded-xl ">
            {/* Section Header Card */}
            <div className="w-full lg:w-[300px] h-full rounded-l-xl p-4 ">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-light-blue/20 flex items-center justify-center shrink-0">
                  <Icon icon="ph:user" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="h4" size="md" weight="semibold" className="text-light-blue">
                    Personal Information
                  </Typography>
                  <Typography as="p" size="sm" weight="normal" className="text-secondary-gray mt-1">
                    Update your basic contact details
                  </Typography>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" type="button">
                Update
              </Button>
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
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                />
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
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
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
                    value={profileData.phone}
                    onChange={(value) => setProfileData({ ...profileData, phone: value })}
                  />
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
                      className="text-secondary-gray hover:text-alert-red"
                      onClick={() => handleFileDelete('profilePhoto')}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-light-blue transition-colors">
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload profile photo
                    </Typography>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
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
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Section Header Card */}
            <div className="w-full lg:w-[300px] bg-light-gray/50 rounded-xl p-4 h-fit">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-light-blue/20 flex items-center justify-center shrink-0">
                  <Icon icon="ph:briefcase" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="h4" size="md" weight="semibold" className="text-light-blue">
                    Professional Information
                  </Typography>
                  <Typography as="p" size="sm" weight="normal" className="text-secondary-gray mt-1">
                    Manage your qualifications and professional credentials.
                  </Typography>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" type="button">
                Update
              </Button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    AHPRA Registration Number
                  </Typography>
                </label>
                <TextInputField
                  placeholder="MED1234567"
                  value={profileData.ahpraNumber}
                  onChange={(e) => setProfileData({ ...profileData, ahpraNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Specialty
                    </Typography>
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue text-secondary-gray"
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                  >
                    <option>General Practitioner</option>
                    <option>Emergency Medicine</option>
                    <option>Anaesthetics</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">
                    <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                      Experience Level
                    </Typography>
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue text-secondary-gray"
                    value={profileData.experienceLevel}
                    onChange={(e) => setProfileData({ ...profileData, experienceLevel: e.target.value })}
                  >
                    <option>Registrar</option>
                    <option>Consultant</option>
                    <option>Fellow</option>
                  </select>
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
                      className="text-secondary-gray hover:text-alert-red"
                      onClick={() => handleFileDelete('medicalDegree')}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-light-blue transition-colors">
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload certificate
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
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
                      className="text-secondary-gray hover:text-alert-red"
                      onClick={() => handleFileDelete('insurance')}
                    >
                      <Icon icon="ph:trash" className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-soft-gray rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-light-blue transition-colors">
                    <Icon icon="ph:upload-simple" className="w-8 h-8 text-secondary-gray mb-2" />
                    <Typography as="p" size="sm" weight="medium" className="text-secondary-gray">
                      Click to upload insurance document
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
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
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Section Header Card */}
            <div className="w-full lg:w-[300px] bg-light-gray/50 rounded-xl p-4 h-fit">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-light-blue/20 flex items-center justify-center shrink-0">
                  <Icon icon="ph:map-pin" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="h4" size="md" weight="semibold" className="text-light-blue">
                    Work & Location
                  </Typography>
                  <Typography as="p" size="sm" weight="normal" className="text-secondary-gray mt-1">
                    Set your location and preferred pay rate.
                  </Typography>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" type="button">
                Update
              </Button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Location
                  </Typography>
                </label>
                <TextInputField
                  placeholder="Sydney, NSW"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Preferred Pay Rate (AUD/hour)
                  </Typography>
                </label>
                <TextInputField
                  placeholder="Preferred Pay Rate (AUD/hour)"
                  value={profileData.preferredPayRate}
                  onChange={(e) => setProfileData({ ...profileData, preferredPayRate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Section Header Card */}
            <div className="w-full lg:w-[300px] bg-light-gray/50 rounded-xl p-4 h-fit">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-light-blue/20 flex items-center justify-center shrink-0">
                  <Icon icon="ph:info" className="w-5 h-5 text-light-blue" />
                </div>
                <div className="flex-1">
                  <Typography as="h4" size="md" weight="semibold" className="text-light-blue">
                    Additional Information
                  </Typography>
                  <Typography as="p" size="sm" weight="normal" className="text-secondary-gray mt-1">
                    Add optional details to complete your profile
                  </Typography>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" type="button">
                Update
              </Button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 bg-white rounded-xl border border-soft-gray p-6 space-y-6">
              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    Profile Bio
                  </Typography>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:border-light-blue min-h-[120px] resize-none text-secondary-gray"
                  placeholder="Experienced general practitioner with over 5 years of clinical practice in both urban and regional healthcare settings."
                  value={profileData.profileBio}
                  onChange={(e) => setProfileData({ ...profileData, profileBio: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-2">
                  <Typography as="span" size="md" weight="medium" className="text-dark-gray">
                    ABN
                  </Typography>
                </label>
                <TextInputField
                  placeholder="12345678901"
                  value={profileData.abn}
                  onChange={(e) => setProfileData({ ...profileData, abn: e.target.value })}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
