"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth.schema";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema ),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Resetting password:", data);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-4 lg:px-6 lg:py-4">
    
      <div className="w-full max-w-[474px] flex flex-col gap-6 ">
       
        <div className="flex flex-col  text-center">
          <Typography as="h1" size="h1" className="  text-primary-dark" weight="semibold">
            Reset Your Password
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Create a new password to secure your account
          </Typography>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Password Input */}
          <PasswordInputField
            label="Password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Confirm Password Input */}
          <PasswordInputField
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Reset Password
          </Button>
        </form>

        {/* Sign In Link - 23px height */}
        <div className="text-center h-[23px] flex items-center justify-center">
          <Typography as="p" size="lg" className="text-light-blue">
            Remember your password?{" "}
            <a href="/login" className="text-light-blue underline">
              Sign in
            </a>
          </Typography>
        </div>

        {/* Bottom Note - 18px height */}
        <div className="text-center h-[18px] flex items-center justify-center">
          <Typography as="p" size="sm" className="text-soft-gray" weight="normal">
            Make sure your password is strong and matches in both fields
          </Typography>
        </div>
      </div>
    </div>
  );
}
