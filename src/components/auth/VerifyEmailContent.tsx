"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EnvelopeOpenIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { getPendingLoginCredentials } from "@/lib/auth/pending-login-credentials";
import { resendVerificationEmail } from "@/lib/supabase/auth-actions";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");

  if (!local || !domain) {
    return email;
  }

  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);

  const email = useMemo(() => {
    const queryEmail = searchParams.get("email")?.trim();
    if (queryEmail) {
      return queryEmail;
    }

    return getPendingLoginCredentials()?.email ?? "";
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error(
        "We could not find your email address. Please register again or sign in.",
      );
      return;
    }

    if (isResending) {
      return;
    }

    setIsResending(true);

    const result = await resendVerificationEmail(email);

    if (result.success) {
      toast.success(result.message);
      setIsResending(false);
      return;
    }

    toast.error(result.message);
    setIsResending(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 sm:py-10 px-4 bg-[url('/assets/images/email-bg.webp')]">
      <div className="w-[150px] h-[20px] sm:w-[180px] sm:h-[22px] lg:w-[218px] lg:h-[24px] mb-12 sm:mb-20 lg:mb-[116px]">
        <Image
          src="/assets/svg/logo.svg"
          alt="Logo"
          width={218}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full max-w-[90%] sm:max-w-[600px] lg:max-w-[706px] min-h-[400px] sm:h-auto lg:h-[488px] rounded-xl bg-white flex items-center justify-center p-6 sm:p-8 lg:p-0">
        <div className="w-full max-w-[474px] flex flex-col items-center gap-4 sm:gap-6 px-4 sm:px-0">
          <div className="h-[42px] w-[42px] p-2 rounded-full border border-[#F7F7F7] bg-white shadow-[0px_8px_32px_0px_rgba(9,15,37,0.25)] flex items-center justify-center">
            <EnvelopeOpenIcon
              className="w-5 h-5 text-light-blue"
              strokeWidth={2}
            />
          </div>

          <div>
            <Typography
              as="h1"
              size="h1"
              className="text-primary-dark text-center"
              weight="semibold"
            >
              Verify Your Email
            </Typography>

            <Typography
              as="p"
              size="lg"
              className="text-muted-gray text-center max-w-[474px] px-4 sm:px-0"
              weight="normal"
            >
              We&apos;ve sent a verification link to{" "}
              {email ? (
                <span className="font-semibold text-primary-dark">
                  {maskEmail(email)}
                </span>
              ) : (
                "your email address"
              )}
              . Please check your inbox and click the link to activate your
              account.
            </Typography>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleResendEmail}
            loading={isResending}
            disabled={isResending || !email}
            className="w-full max-w-[474px]"
          >
            Resend Verification Email
          </Button>

          <div className="text-center">
            <Typography as="p" size="lg" className="text-light-blue">
              Return to{" "}
              <Link
                href="/login"
                className="text-light-blue underline font-semibold"
              >
                Login?
              </Link>
            </Typography>
          </div>

          <Typography
            as="p"
            size="sm"
            className="text-primary-gray text-center"
            weight="normal"
          >
            Didn&apos;t receive the email? Check your spam folder or request a
            new one.
          </Typography>
        </div>
      </div>
    </div>
  );
}
