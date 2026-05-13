'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Dropdown } from '@/components/shared/dropdown';
import { PhoneInput } from '@/components/shared/phone-input';
import { FileUpload } from '@/components/shared/file-upload';
import { CompleteProfileLayout, ProfileFormCard } from '@/components/profile/complete-profile';
import { 
  DOCTOR_SPECIALTY_OPTIONS, 
  EXPERIENCE_LEVEL_OPTIONS,
  DOCTOR_PROFILE_STEPS 
} from '@/constants/complete-profile';

export default function CompleteProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [specialty, setSpecialty] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
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

            <PhoneInput
              id="phone"
              label="Phone Number*"
              placeholder="Enter you Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              required
            />

            <TextInputField
              id="ahpra"
              label="AHPRA Registration Number*"
              placeholder="Enter AHPRA Registration Number"
            />

            <Dropdown
              id="specialty"
              label="Specialty"
              placeholder="Select Speciality"
              options={DOCTOR_SPECIALTY_OPTIONS}
              value={specialty}
              onChange={setSpecialty}
              required
              allowCustomInput
            />

            <Dropdown
              id="experience-level"
              label="Experience Level"
              placeholder="Select Experience Level"
              options={EXPERIENCE_LEVEL_OPTIONS}
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
