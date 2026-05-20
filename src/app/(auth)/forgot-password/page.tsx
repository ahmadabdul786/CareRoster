"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { TextInputField } from "@/components/shared/text-input-field";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Sending reset link to:", data.email);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 lg:px-6 lg:py-4">
      {/* Main Container - 474x332 */}
      <div className="w-full max-w-[474px] flex flex-col gap-4">
        {/* Heading Section */}
        <div className="flex flex-col gap-1 text-center">
          <Typography as="h1" size="h1" className="text-primary-dark" weight="semibold">
            Forgot Password?
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Typography>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          {/* Email Input */}
          <div>
            <TextInputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <div className="min-h-5 pt-1">
              {errors.email && (
                <Typography as="p" size="sm" className="text-alert-red">
                  {errors.email.message}
                </Typography>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Send Reset Link
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-[8px]">
          <Typography as="p" size="lg" className="text-light-blue ">
            Remember your password?{" "}
            <a href="/login" className="text-light-blue underline ">
              Sign in
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}
