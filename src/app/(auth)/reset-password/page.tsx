"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reset password submission
    console.log("Resetting password...");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-4 lg:px-6 lg:py-4">
      {/* Main Container - 474x448 with 34px gap */}
      <div className="w-full max-w-[474px] flex flex-col gap-[34px]">
        {/* Heading Section - 75px height with 16px gap */}
        <div className="flex flex-col gap-4 text-center">
          <Typography as="h1" size="h1" className="text-primary-dark" weight="semibold">
            Reset Your Password
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Create a new password to secure your account
          </Typography>
        </div>

        {/* Form Section - 240px height with 24px gap */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Password Input */}
          <PasswordInputField
            label="Password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          {/* Confirm Password Input */}
          <PasswordInputField
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

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

        {/* Sign In Link - 23px height */}
        <div className="text-center h-[23px] flex items-center justify-center">
          <Typography as="p" size="lg" className="text-light-blue">
            Remember your password?{" "}
            <a href="/login" className="text-light-blue underline font-semibold">
              Sign in
            </a>
          </Typography>
        </div>

        {/* Bottom Note - 18px height */}
        <div className="text-center h-[18px] flex items-center justify-center">
          <Typography as="p" size="sm" className="text-muted-gray" weight="normal">
            Make sure your password is strong and matches in both fields
          </Typography>
        </div>
      </div>
    </div>
  );
}
