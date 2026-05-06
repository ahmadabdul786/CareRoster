"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Image from "next/image";
import { EnvelopeOpenIcon } from "@phosphor-icons/react";


export default function VerifyEmailPage() {
  const handleResendEmail = () => {
    // Handle resend verification email
    console.log("Resending verification email...");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 sm:py-10 px-4 bg-[url('/assets/images/email-bg.webp')]">
      {/* Logo at top center */}
      <div className="w-[150px] h-[20px] sm:w-[180px] sm:h-[22px] lg:w-[218px] lg:h-[24px] mb-12 sm:mb-20 lg:mb-[116px]">
        <Image
          src="/assets/svg/logo.svg"
          alt="Logo"
          width={218}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main Container - responsive with rounded corners */}
      <div className="w-full max-w-[90%] sm:max-w-[600px] lg:max-w-[706px] min-h-[400px] sm:h-auto lg:h-[488px] rounded-2xl bg-white flex items-center justify-center p-6 sm:p-8 lg:p-0">
        {/* Inner Content */}
        <div className="w-full max-w-[474px] flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
          {/* Email Icon Container - 42x42 */}
          <div className="h-[42px] w-[42px] p-2 rounded-full border border-[#F7F7F7] bg-white shadow-[0px_8px_32px_0px_rgba(9,15,37,0.25)] flex items-center justify-center">
            <EnvelopeOpenIcon className="w-5 h-5 text-light-blue" strokeWidth={2} />
          </div>
<div>
          {/* Heading */}
          <Typography as="h1" size="h1" className="text-primary-dark text-center" weight="semibold">
            Verify Your Email
          </Typography>

          {/* Description */}
          <Typography as="p" size="lg" className="text-muted-gray text-center max-w-[474px] px-4 sm:px-0" weight="normal">
            We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to activate your account
          </Typography>

          </div>

          {/* Resend Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleResendEmail}
            className="w-full max-w-[474px]"
          >
            Resend Verification Email
          </Button>

          {/* Return to Login Link */}
          <div className="text-center">
            <Typography as="p" size="lg" className="text-light-blue">
              Return to{" "}
              <a href="/login" className="text-light-blue underline font-semibold">
                Login?
              </a>
            </Typography>
          </div>

          {/* Bottom Note */}
          <Typography as="p" size="sm" className="text-muted-gray text-center" weight="normal">
            Didn't receive the email? Check your spam folder or request a new one
          </Typography>
        </div>
      </div>
    </div>
  );
}
