'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Dropdown } from '@/components/shared/dropdown';
import { FileUpload } from '@/components/shared/file-upload';
import { CompleteProfileLayout, ProfileFormCard } from '@/components/profile/complete-profile';

const specialtyOptions = [
  { value: 'general-practice', label: 'General Practice (GP)' },
  { value: 'emergency-medicine', label: 'Emergency Medicine' },
  { value: 'anaesthetics', label: 'Anaesthetics' },
  { value: 'internal-medicine', label: 'Internal Medicine' },
  { value: 'surgery-general', label: 'Surgery (General)' },
  { value: 'paediatrics', label: 'Paediatrics' },
  { value: 'obstetrics-gynaecology', label: 'Obstetrics & Gynaecology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'orthopaedics', label: 'Orthopaedics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'other', label: 'Other (free text input)' },
];

const experienceLevelOptions = [
  { value: 'junior', label: 'Junior' },
  { value: 'registrar', label: 'Registrar' },
  { value: 'consultant', label: 'Consultant' },
];

export default function CompleteProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [specialty, setSpecialty] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  
  // Document upload states
  const [medicalDegree, setMedicalDegree] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <CompleteProfileLayout currentStep={currentStep}>
      {currentStep === 0 ? (
        <ProfileFormCard title="Basic Information">
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleNextStep();
            }}
          >
            <TextInputField
              id="full-name"
              label="Full Name*"
              placeholder="Enter Full Name*"
            />

            <TextInputField
              id="email"
              label="Email Address*"
              placeholder="abc@gmail.com"
              type="email"
            />

            <div className="flex flex-col gap-1">
              <label 
                htmlFor="phone"
                className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal"
              >
                Phone Number*
              </label>
              <div className="flex h-[48px] items-center rounded-[16px] border border-soft-gray bg-white focus-within:border-light-blue transition-colors">
                <div className="flex items-center gap-2 border-r border-soft-gray px-3 text-base text-dark-gray">
                  <span className="text-xl">🇦🇺</span>
                  <Icon icon="mdi:chevron-down" className="h-4 w-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter you Phone Number"
                  className="flex-1 px-3 text-base text-dark-gray outline-none placeholder:text-primary-gray"
                />
              </div>
            </div>

            <TextInputField
              id="ahpra"
              label="AHPRA Registration Number*"
              placeholder="Enter AHPRA Registration Number"
            />

            <Dropdown
              id="specialty"
              label="Specialty"
              placeholder="Select Speciality"
              options={specialtyOptions}
              value={specialty}
              onChange={setSpecialty}
              required
              allowCustomInput
            />

            <Dropdown
              id="experience-level"
              label="Experience Level"
              placeholder="Select Experience Level"
              options={experienceLevelOptions}
              value={experienceLevel}
              onChange={setExperienceLevel}
              required
            />

            <TextInputField
              id="location"
              label="Location*"
              placeholder="Enter Location"
            />

            <TextInputField
              id="pay-rate"
              label="Preferred Pay Rate"
              placeholder="Enter Preferred Pay Rate"
            />

            <TextInputField
              id="abn"
              label="ABN"
              placeholder="Enter ABN(11 digits)"
            />

            <div className="flex flex-col gap-1">
              <label 
                htmlFor="bio"
                className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal"
              >
                Profile Bio
              </label>
              <textarea
                id="bio"
                placeholder="Enter Bio(max 500 characters)"
                className="min-h-[120px] rounded-[16px] border border-soft-gray px-4 py-3 text-base text-dark-gray outline-none placeholder:text-primary-gray resize-none focus:border-light-blue transition-colors"
              />
            </div>

            <Button type="submit" variant="outline" size="default">
              Continue
            </Button>
          </form>
        </ProfileFormCard>
      ) : (
        <ProfileFormCard title="Document Uploads">
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              console.log('Form submitted with documents:', {
                medicalDegree,
                insurance,
                profilePhoto,
              });
              // Handle form submission here
            }}
          >
            <FileUpload
              id="medical-degree"
              label="Medical Degree Certificate*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={setMedicalDegree}
            />

            <FileUpload
              id="insurance"
              label="Professional Indemnity Insurance*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={setInsurance}
            />

            <FileUpload
              id="profile-photo"
              label="Profile Photo"
              accept=".jpg,.jpeg,.png"
              maxSize={5}
              onChange={setProfilePhoto}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button type="submit" variant="primary" size="default">
                Save Profile
              </Button>
            </div>
          </form>
        </ProfileFormCard>
      )}
    </CompleteProfileLayout>
  );
}
