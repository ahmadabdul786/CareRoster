"use client";

import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SealCheckIcon } from "@phosphor-icons/react";

export default function VerifyEmailSuccessPage() {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to profile setup
    router.push("/profile-setup");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white bg-[url('/assets/images/email-bg.webp')] py-10 px-4">
      {/* Logo at top center */}
      <div className="w-[218px] h-[24px] mb-[116px]">
        <Image
          src="/assets/svg/logo.svg"
          alt="Logo"
          width={218}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main Container - 706x488 with rounded corners */}
      <div className="w-full max-w-[706px] h-[488px] rounded-[36px] bg-white border border-[#F7F7F7]  flex items-center justify-center">
        {/* Inner Content - 474x364 */}
        <div className="w-full max-w-[474px] flex flex-col items-center gap-6">
          {/* Success Icon Container - 42x42 */}
          <div className="w-[42px] h-[42px] p-2 rounded-full border border-[#F7F7F7] bg-white shadow-[0px_28.32px_54.76px_0px_rgba(9,15,37,0.15)] flex items-center justify-center">
            
            <SealCheckIcon  strokeWidth={2} className="w-5 h-5   text-light-blue" size={32} />
          </div>

          {/* Heading */}
          <Typography as="h1" size="h1" className="text-primary-dark text-center" weight="semibold">
            Email Verified Successfully
          </Typography>

          {/* Description */}
          <Typography as="p" size="lg" className="text-muted-gray text-center max-w-[474px]" weight="normal">
            Your account has been successfully verified. You can now continue setting up your profile
          </Typography>

          {/* Continue Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="w-full max-w-[474px]"
          >
            Continue to Profile Setup
          </Button>
        </div>
      </div>
    </div>
  );
}
