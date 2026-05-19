'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Dropdown } from '@/components/shared/dropdown';
import { PhoneInput } from '@/components/shared/phone-input';
import { FileUpload } from '@/components/shared/file-upload';
import { CompleteProfileLayout, ProfileFormCard } from '@/components/profile/complete-profile';
import {
  FACILITY_TYPE_OPTIONS,
  AUSTRALIAN_STATE_OPTIONS,
  HOSPITAL_PROFILE_STEPS,
} from '@/constants/complete-profile';

// Step 1 schema
const orgInfoSchema = z.object({
  entityName: z.string().min(1, 'Entity name is required'),
  abn: z
    .string()
    .min(1, 'ABN is required')
    .refine((val) => /^\d{11}$/.test(val.replace(/\s/g, '')), {
      message: 'ABN must be 11 digits',
    }),
  facilityType: z.string().min(1, 'Facility type is required'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  certificate: z.instanceof(File, { message: 'Certificate is required' }),
});

// Step 2 schema
const contactLocationSchema = z.object({
  contactPerson: z.string().min(1, 'Contact person name is required'),
  contactEmail: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => val.replace(/\D/g, '').length >= 6, {
      message: 'Enter a valid phone number',
    }),
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'State is required'),
});

type OrgInfoValues = z.infer<typeof orgInfoSchema>;
type ContactLocationValues = z.infer<typeof contactLocationSchema>;

export default function CompleteProfileHospitalPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [orgInfoData, setOrgInfoData] = useState<OrgInfoValues | null>(null);

  // Step 1 form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrgInfoValues>({
    resolver: zodResolver(orgInfoSchema),
    defaultValues: { facilityType: '' },
  });

  // Step 2 form
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    setValue: setContactValue,
    watch: watchContact,
    formState: { errors: contactErrors },
  } = useForm<ContactLocationValues>({
    resolver: zodResolver(contactLocationSchema),
    defaultValues: { phone: '', state: '' },
  });

  const facilityTypeValue = watch('facilityType');
  const phoneValue = watchContact('phone');
  const stateValue = watchContact('state');

  const onOrgInfoSubmit = (data: OrgInfoValues) => {
    setOrgInfoData(data);
    setCurrentStep(1);
  };

  const onContactLocationSubmit = (data: ContactLocationValues) => {
    const fullProfile = { ...orgInfoData, ...data };
    console.log('Full profile:', fullProfile);
    // Handle final submission here
  };

  return (
    <CompleteProfileLayout
      currentStep={currentStep}
      tag="HOSPITAL/CLINIC"
      title="Complete Your Organisation Profile"
      description="Provide your organisation details to start posting and managing shifts"
      steps={HOSPITAL_PROFILE_STEPS}
    >
      {currentStep === 0 ? (
        <ProfileFormCard key="org-info" title="Organisation Information">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onOrgInfoSubmit)}>
            <TextInputField
              id="entity-name"
              label="Entity Name*"
              placeholder="Enter legal business name"
              error={errors.entityName?.message}
              {...register('entityName')}
            />

            <TextInputField
              id="abn"
              label="ABN*"
              placeholder="Enter (11-digit) Australian Business Number"
              error={errors.abn?.message}
              {...register('abn')}
            />

            <Dropdown
              id="facility-type"
              label="Facility Type"
              placeholder="Select facility type"
              options={FACILITY_TYPE_OPTIONS}
              value={facilityTypeValue}
              onChange={(val) => setValue('facilityType', val, { shouldValidate: true })}
              required
              error={errors.facilityType?.message}
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
                {...register('description')}
              />
              {errors.description && (
                <span className="text-xs sm:text-sm text-red-500">{errors.description.message}</span>
              )}
            </div>

            <FileUpload
              id="medical-degree-certificate"
              label="Certificate*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={(file) => {
                if (file) setValue('certificate', file, { shouldValidate: true });
              }}
              error={errors.certificate?.message as string | undefined}
            />

            <Button type="submit" variant="outline" size="default">
              Continue
            </Button>
          </form>
        </ProfileFormCard>
      ) : (
        <ProfileFormCard key="contact-location" title="Contact & Location">
          <form className="flex flex-col gap-6" onSubmit={handleSubmitContact(onContactLocationSubmit)}>
            <TextInputField
              id="contact-person"
              label="Contact Person Name*"
              placeholder="Enter primary contact name"
              error={contactErrors.contactPerson?.message}
              {...registerContact('contactPerson')}
            />

            <TextInputField
              id="contact-email"
              label="Contact Email*"
              placeholder="Enter email for notifications"
              type="email"
              error={contactErrors.contactEmail?.message}
              {...registerContact('contactEmail')}
            />

            <PhoneInput
              id="phone"
              label="Phone Number*"
              placeholder="Enter your Phone Number"
              value={phoneValue}
              onChange={(val) => setContactValue('phone', val, { shouldValidate: true })}
              error={contactErrors.phone?.message}
            />

            <TextInputField
              id="address"
              label="Location / Address*"
              placeholder="Enter full address"
              error={contactErrors.address?.message}
              {...registerContact('address')}
            />

            <Dropdown
              id="state"
              label="State"
              placeholder="Select state"
              options={AUSTRALIAN_STATE_OPTIONS}
              value={stateValue}
              onChange={(val) => setContactValue('state', val, { shouldValidate: true })}
              required
              error={contactErrors.state?.message}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => setCurrentStep(0)}
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
