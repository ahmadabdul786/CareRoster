"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { doctorRegistrationSchema, type DoctorRegistrationFormData } from "@/schemas/auth.schema";

interface DoctorRegistrationFormProps {
  onBack?: () => void;
}

export const DoctorRegistrationForm = ({ onBack }: DoctorRegistrationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DoctorRegistrationFormData>({
    resolver: zodResolver(doctorRegistrationSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = (data: DoctorRegistrationFormData) => {
    console.log("Doctor registration data:", data);
  };

  return (
    <div className="w-full max-w-[474px] mx-auto flex flex-col gap-6">
      {/* Heading Container - 98px height, 10px gap */}
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
            DOCTORS
          </Typography>
        </div>
        <Typography as="h1" size="h1" className="text-primary-dark text-center" weight="semibold">
          Create Your Account
        </Typography>
        <Typography as="p" size="lg" weight={'normal'} className="text-muted-gray text-center">
          Please enter your credentials to begin your journey
        </Typography>
      </div>

      {/* Form Container - 448px height, 16px gap */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Full Name */}
        <div>
          <TextInputField
            label="Full Name"
            placeholder="Your full name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <Typography as="p" size="sm" className="text-alert-red mt-1">
              {errors.fullName.message}
            </Typography>
          )}
        </div>

        {/* Email */}
        <div>
          <TextInputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <Typography as="p" size="sm" className="text-alert-red mt-1">
              {errors.email.message}
            </Typography>
          )}
        </div>

        {/* Password */}
        <div>
          <PasswordInputField
            label="Password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <Typography as="p" size="sm" className="text-alert-red mt-1">
              {errors.password.message}
            </Typography>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordInputField
            label="Confirm password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <Typography as="p" size="sm" className="text-alert-red mt-1">
              {errors.confirmPassword.message}
            </Typography>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3 mt-2">
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
        {errors.agreeToTerms && (
          <Typography as="p" size="sm" className="text-alert-red">
            {errors.agreeToTerms.message}
          </Typography>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!agreeToTerms}
          className="mt-2"
        >
          Register
        </Button>
      </form>

      {/* Sign In Link - 23px height */}
      <div className="text-center h-[23px] sm:px-14 sm:py-2.5 flex items-center justify-center">
        <Typography as="p" size="md" className="text-light-blue">
          Already have an account?{" "}
          <a href="/login" className="text-light-blue underline font-semibold">
            Sign In
          </a>
        </Typography>
      </div>
    </div>
  );
};
