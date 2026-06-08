'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  DOCTOR_SPECIALTY_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  DOCTOR_PROFILE_STEPS,
} from '@/constants/complete-profile';

// Step 1 schema
const basicInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => val.replace(/\D/g, '').length >= 6, {
      message: 'Enter a valid phone number',
    }),
  ahpra: z.string().min(1, 'AHPRA registration number is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  location: z.string().min(1, 'Location is required'),
  payRate: z.string().optional(),
  abn: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{11}$/.test(val.replace(/\s/g, '')), {
      message: 'ABN must be 11 digits',
    }),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

// Step 2 schema
const documentsSchema = z.object({
  medicalDegree: z.instanceof(File, { message: 'Medical degree certificate is required' }),
  insurance: z.instanceof(File, { message: 'Professional indemnity insurance is required' }),
  profilePhoto: z.instanceof(File).optional(),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;
type DocumentsValues = z.infer<typeof documentsSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoValues | null>(null);

  // Step 1 form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: { phone: '', specialty: '', experienceLevel: '' },
  });

  // Step 2 form
  const {
    handleSubmit: handleSubmitDocs,
    setValue: setDocValue,
    formState: { errors: docErrors },
  } = useForm<DocumentsValues>({
    resolver: zodResolver(documentsSchema),
  });

  const phoneValue = watch('phone');
  const specialtyValue = watch('specialty');
  const experienceLevelValue = watch('experienceLevel');

  const onBasicInfoSubmit = (data: BasicInfoValues) => {
    setBasicInfoData(data);
    setCurrentStep(1);
  };

  const onDocumentsSubmit = (data: DocumentsValues) => {
    const fullProfile = { ...basicInfoData, ...data };
    console.log('Full profile:', fullProfile);
    // Handle final submission here
  };

  return (
    <CompleteProfileLayout currentStep={currentStep} steps={DOCTOR_PROFILE_STEPS} onSkip={() => router.push('/dashboard/doctor')}>
      {currentStep === 0 ? (
        <ProfileFormCard title="Basic Information">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onBasicInfoSubmit)}>
            <TextInputField
              id="full-name"
              label="Full Name*"
              placeholder="Enter Full Name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <TextInputField
              id="email"
              label="Email Address*"
              placeholder="abc@gmail.com"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <PhoneInput
              id="phone"
              label="Phone Number*"
              value={phoneValue}
              onChange={(val) => setValue('phone', val, { shouldValidate: true })}
              error={errors.phone?.message}
            />

            <TextInputField
              id="ahpra"
              label="AHPRA Registration Number*"
              placeholder="Enter AHPRA Registration Number"
              error={errors.ahpra?.message}
              {...register('ahpra')}
            />

            <Dropdown
              id="specialty"
              label="Specialty"
              placeholder="Select Speciality"
              options={DOCTOR_SPECIALTY_OPTIONS}
              value={specialtyValue}
              onChange={(val) => setValue('specialty', val, { shouldValidate: true })}
              required
              allowCustomInput
              error={errors.specialty?.message}
            />

            <Dropdown
              id="experience-level"
              label="Experience Level"
              placeholder="Select Experience Level"
              options={EXPERIENCE_LEVEL_OPTIONS}
              value={experienceLevelValue}
              onChange={(val) => setValue('experienceLevel', val, { shouldValidate: true })}
              required
              error={errors.experienceLevel?.message}
            />

            <TextInputField
              id="location"
              label="Location*"
              placeholder="Enter Location"
              error={errors.location?.message}
              {...register('location')}
            />

            <TextInputField
              id="pay-rate"
              label="Preferred Pay Rate"
              placeholder="Enter Preferred Pay Rate"
              error={errors.payRate?.message}
              {...register('payRate')}
            />

            <TextInputField
              id="abn"
              label="ABN"
              placeholder="Enter ABN (11 digits)"
              error={errors.abn?.message}
              {...register('abn')}
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
                placeholder="Enter Bio (max 500 characters)"
                className="min-h-[120px] rounded-[16px] border border-primary-gray px-4 py-3 text-base text-dark-gray outline-none placeholder:text-primary-gray resize-none focus:border-light-blue transition-colors"
                {...register('bio')}
              />
              {errors.bio && (
                <span className="text-xs sm:text-sm text-red-500">{errors.bio.message}</span>
              )}
            </div>

            <Button type="submit" variant="outline" size="default">
              Continue
            </Button>
          </form>
        </ProfileFormCard>
      ) : (
        <ProfileFormCard title="Document Uploads">
          <form className="flex flex-col gap-6" onSubmit={handleSubmitDocs(onDocumentsSubmit)}>
            <FileUpload
              id="medical-degree"
              label="Medical Degree Certificate*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={(file) => {
                if (file) setDocValue('medicalDegree', file, { shouldValidate: true });
              }}
              error={docErrors.medicalDegree?.message as string | undefined}
            />

            <FileUpload
              id="insurance"
              label="Professional Indemnity Insurance*"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10}
              onChange={(file) => {
                if (file) setDocValue('insurance', file, { shouldValidate: true });
              }}
              error={docErrors.insurance?.message as string | undefined}
            />

            <FileUpload
              id="profile-photo"
              label="Profile Photo"
              accept=".jpg,.jpeg,.png"
              maxSize={5}
              onChange={(file) => {
                if (file) setDocValue('profilePhoto', file);
              }}
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
