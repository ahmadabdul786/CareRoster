'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Dropdown } from '@/components/shared/dropdown';
import { PhoneInput } from '@/components/shared/phone-input';
import { FileUpload } from '@/components/shared/file-upload';
import { CompleteProfileLayout, ProfileFormCard } from '@/components/profile/complete-profile';

const facilityTypeOptions = [
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'medical-center', label: 'Medical Center' },
  { value: 'aged-care', label: 'Aged Care Facility' },
  { value: 'private-practice', label: 'Private Practice' },
];

const stateOptions = [
  { value: 'nsw', label: 'New South Wales' },
  { value: 'vic', label: 'Victoria' },
  { value: 'qld', label: 'Queensland' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'sa', label: 'South Australia' },
  { value: 'tas', label: 'Tasmania' },
  { value: 'act', label: 'Australian Capital Territory' },
  { value: 'nt', label: 'Northern Territory' },
];

export default function CompleteProfileHospitalPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [facilityType, setFacilityType] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Document upload state
  const [medicalDegreeCertificate, setMedicalDegreeCertificate] = useState<File | null>(null);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    console.log('Form submitted with data:', {
      facilityType,
      state,
      phoneNumber,
      medicalDegreeCertificate,
    });
    // Handle form submission here
  };

  return (
    <CompleteProfileLayout 
      currentStep={currentStep}
      tag="HOSPITAL/CLINIC"
      title="Complete Your Organisation Profile"
      description="Provide your organisation details to start posting and managing shifts"
      steps={[
        {
          id: 'organisation',
          title: 'Organisation Information',
          description: 'Add your organisation details',
          icon: 'ph:hospital',
        },
        {
          id: 'contact',
          title: 'Contact & Location',
          description: 'Add contact and location details',
          icon: 'ph:map-pin',
        },
      ]}
    >
      {currentStep === 0 ? (
        <ProfileFormCard title="Organisation Information">
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleNextStep();
            }}
          >
            <TextInputField
              id="entity-name"
              label="Entity Name*"
              placeholder="Enter legal business name"
            />

            <TextInputField
              id="abn"
              label="ABN*"
              placeholder="Enter (11-digit) Australian Business Number"
            />

            <Dropdown
              id="facility-type"
              label="Facility Type"
              placeholder="Select facility type"
              options={facilityTypeOptions}
              value={facilityType}
              onChange={setFacilityType}
              required
            />

            <div className="flex flex-col gap-1">
              <label 
                htmlFor="description"
                className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal"
              >
                Organisation Description
              </label>
              <textarea
                id="description"
                placeholder="Brief description (max 1000 characters)"
                className="min-h-[160px] rounded-[16px] border border-soft-gray px-4 py-3 text-base text-dark-gray outline-none placeholder:text-primary-gray resize-none focus:border-light-blue transition-colors"
                maxLength={1000}
              />
            </div>

            <FileUpload
              id="medical-degree-certificate"
              label="Medical Degree Certificate*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={setMedicalDegreeCertificate}
            />

            <Button type="submit" variant="outline" size="default">
              Continue
            </Button>
          </form>
        </ProfileFormCard>
      ) : (
        <ProfileFormCard title="Contact & Location">
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <TextInputField
              id="contact-person"
              label="Contact Person Name*"
              placeholder="Enter primary contact name"
            />

            <TextInputField
              id="contact-email"
              label="Contact Email*"
              placeholder="Enter email for notifications"
              type="email"
            />

            <PhoneInput
              id="phone"
              label="Phone Number"
              placeholder="Enter you Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              required
            />

            <TextInputField
              id="address"
              label="Location / Address*"
              placeholder="Enter full address"
            />

            <Dropdown
              id="state"
              label="State"
              placeholder="Select state"
              options={stateOptions}
              value={state}
              onChange={setState}
              required
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
