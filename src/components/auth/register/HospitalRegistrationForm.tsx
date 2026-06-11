"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { hospitalRegistrationSchema, type HospitalRegistrationFormData } from "@/schemas/auth.schema";
import { signUpHospital } from "@/lib/supabase/auth-actions";
import { toast } from "sonner";

interface HospitalRegistrationFormProps {
  onBack?: () => void;
}

export const HospitalRegistrationForm = ({ onBack }: HospitalRegistrationFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HospitalRegistrationFormData>({
    resolver: zodResolver(hospitalRegistrationSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: HospitalRegistrationFormData) => {
    setIsLoading(true);

    const result = await signUpHospital({
      contactPersonName: data.contactPersonName,
      hospitalClinicName: data.hospitalClinicName,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      router.push(result.redirectTo);
      return;
    }

    toast.error(result.message);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-[474px]  mx-auto flex flex-col gap-6">
      {/* Heading Container - 98px height*/}
      <div className="flex flex-col ">
        <div className="flex items-center justify-center gap-2 relative">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="absolute left-0 text-muted-gray hover:text-primary-dark transition-colors"
              aria-label="Go back"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <div className="w-4 h-1 rounded-full bg-light-blue"></div>
          <Typography as="p" size="lg" weight={'semibold'} className="text-primary-dark uppercase tracking-wider">
            HOSPITAL/CLINIC
          </Typography>
        </div>
        <Typography as="h1" size="h1" className="text-primary-dark text-center" weight="semibold">
          Create Your Account
        </Typography>
        <Typography as="p" size="lg" weight={'normal'} className="text-muted-gray text-center">
          Begin sourcing elite Medical professionals today
        </Typography>
      </div>

      {/* Form Container - 536px height, 16px gap */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Contact Person Name */}
        <TextInputField
          label="Contact Person Name"
          placeholder="Your contact Person Name"
          error={errors.contactPersonName?.message}
          {...register("contactPersonName")}
        />

        {/* Hospital / Clinic Name */}
        <TextInputField
          label="Hospital / Clinic Name"
          placeholder="Your Hospital / Clinic Name"
          error={errors.hospitalClinicName?.message}
          {...register("hospitalClinicName")}
        />

        {/* Email */}
        <TextInputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password */}
        <PasswordInputField
          label="Password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Confirm Password */}
        <PasswordInputField
          label="Confirm password"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Terms and Conditions */}
        <div className="flex flex-col gap-1 -my-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              {...register("agreeToTerms")}
              className="w-5 h-5 mt-0.5 accent-light-blue cursor-pointer"
            />
            <label htmlFor="terms" className="flex-1 cursor-pointer">
              <Typography as="span" size="lg" weight={'normal'} className="text-primary-dark">
                Do you agree to our{" "}
                <a href="/terms" className="text-light-blue hover:underline">
                  terms
                </a>{" "}
                &{" "}
                <a href="/privacy" className="text-light-blue hover:underline">
                  privacy policy
                </a>
                .
              </Typography>
            </label>
          </div>
          <div className="relative h-4">
            {errors.agreeToTerms && (
              <span className="absolute top-0 left-0 text-[10px] text-red-500">
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!agreeToTerms || isLoading}
          loading={isLoading}
        >
          Register
        </Button>
      </form>

      {/* Sign In Link - 23px height */}
      <div className="text-center h-[23px] flex items-center justify-center">
        <Typography as="p" size="lg" className="text-light-blue">
          Already have an account?{" "}
          <a href="/login" className="text-light-blue underline ">
            Sign In
          </a>
        </Typography>
      </div>
    </div>
  );
};
