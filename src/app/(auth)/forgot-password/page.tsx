"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { TextInputField } from "@/components/shared/text-input-field";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password submission
    console.log("Sending reset link to:", email);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 lg:px-12 lg:py-12">
      {/* Main Container - 474x332 */}
      <div className="w-full max-w-[474px] flex flex-col gap-6">
        {/* Heading Section */}
        <div className="flex flex-col gap-4 text-center">
          <Typography as="h1" size="h1" className="text-primary-dark" weight="semibold">
            Forgot Password?
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Typography>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Input */}
          <TextInputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Sign In Link */}
        <div className="text-center">
          <Typography as="p" size="lg" className="text-light-blue">
            Remember your password?{" "}
            <a href="/login" className="text-light-blue underline font-semibold">
              Sign in
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}
