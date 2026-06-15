"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { EnvelopeOpenIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import {
  getPendingRegistrationEmail,
  isRegistrationEmailVerified,
  markRegistrationEmailVerified,
} from "@/lib/auth/pending-registration-email";
import {
  getRegistrationEmailVerificationStatus,
  resendVerificationEmailClient,
} from "@/lib/supabase/client-auth";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { useAppDispatch } from "@/redux/hooks";
import { clearUser } from "@/redux/features/auth/authSlice";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");

  if (!local || !domain) {
    return email;
  }

  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}

export function VerifyEmailContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [isResending, setIsResending] = useState(false);
  const [isReturningToLogin, setIsReturningToLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCheckingVerification, setIsCheckingVerification] = useState(true);

  const email = useMemo(() => {
    const queryEmail = searchParams.get("email")?.trim();
    if (queryEmail) {
      return queryEmail;
    }

    return getPendingRegistrationEmail() ?? "";
  }, [searchParams]);

  const refreshVerificationStatus = useCallback(async () => {
    if (!email) {
      setIsEmailVerified(false);
      setIsCheckingVerification(false);
      return;
    }

    if (isRegistrationEmailVerified(email)) {
      setIsEmailVerified(true);
      setIsCheckingVerification(false);
      return;
    }

    const status = await getRegistrationEmailVerificationStatus(email);
    setIsEmailVerified(status === "verified");
    setIsCheckingVerification(false);
  }, [email]);

  useEffect(() => {
    setIsCheckingVerification(true);
    void refreshVerificationStatus();
  }, [refreshVerificationStatus]);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;

      if (user?.email_confirmed_at) {
        const confirmedEmail = user.email?.trim().toLowerCase();

        if (confirmedEmail) {
          markRegistrationEmailVerified(confirmedEmail);
        }

        if (!email || confirmedEmail === email.trim().toLowerCase()) {
          setIsEmailVerified(true);
        }
      }
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && !user.email_confirmed_at) {
        supabase.auth.signOut().catch((error) => {
          console.error(
            "[VerifyEmail] Failed to clear pending verification session:",
            error,
          );
        });
        dispatch(clearUser());
        return;
      }

      if (
        user?.email_confirmed_at &&
        user.email?.trim().toLowerCase() === email.trim().toLowerCase()
      ) {
        markRegistrationEmailVerified(email);
        setIsEmailVerified(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, email]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== "verifiedRegistrationEmail" || !email) {
        return;
      }

      if (isRegistrationEmailVerified(email)) {
        setIsEmailVerified(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [email]);

  const verificationError = searchParams.get("error");

  const errorMessage = useMemo(() => {
    if (isEmailVerified) {
      return "Your email has already been verified. Return to login to sign in.";
    }

    if (verificationError === "expired") {
      return "This verification link has expired or was already used. Request a new one below.";
    }

    if (verificationError === "auth") {
      return "We could not verify your email. Request a new verification link below.";
    }

    return null;
  }, [isEmailVerified, verificationError]);

  const handleResendEmail = async () => {
    if (isEmailVerified) {
      return;
    }

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

    const result = await resendVerificationEmailClient(email);

    if (result.success) {
      toast.success(result.message);
      setIsResending(false);
      return;
    }

    if (result.alreadyVerified) {
      setIsEmailVerified(true);
    }

    toast.error(result.message);
    setIsResending(false);
  };

  const handleReturnToLogin = async () => {
    if (isReturningToLogin) {
      return;
    }

    setIsReturningToLogin(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      dispatch(clearUser());
    } catch (error) {
      console.error("[VerifyEmail] Failed to clear session before login:", error);
    }

    router.push(isEmailVerified ? "/login?verified=true" : "/login");
  };

  const isResendDisabled =
    isEmailVerified || isResending || isCheckingVerification || !email;

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
              {isEmailVerified ? "Email Already Verified" : "Verify Your Email"}
            </Typography>

            <Typography
              as="p"
              size="lg"
              className="text-muted-gray text-center max-w-[474px] px-4 sm:px-0"
              weight="normal"
            >
              {isEmailVerified ? (
                <>
                  Your email{" "}
                  {email ? (
                    <span className="font-semibold text-primary-dark">
                      {maskEmail(email)}
                    </span>
                  ) : (
                    "address"
                  )}{" "}
                  has already been verified. Sign in to continue setting up your
                  account.
                </>
              ) : (
                <>
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
                </>
              )}
            </Typography>
          </div>

          {errorMessage && (
            <Typography
              as="p"
              size="md"
              className={`text-center max-w-[474px] ${
                isEmailVerified ? "text-primary-gray" : "text-red-600"
              }`}
              weight="normal"
            >
              {errorMessage}
            </Typography>
          )}

          {!isEmailVerified && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleResendEmail}
              loading={isResending || isCheckingVerification}
              disabled={isResendDisabled}
              className="w-full max-w-[474px]"
            >
              Resend Verification Email
            </Button>
          )}

          <div className="text-center">
            <Typography as="p" size="lg" className="text-light-blue">
              Return to{" "}
              <button
                type="button"
                onClick={handleReturnToLogin}
                disabled={isReturningToLogin}
                className="text-light-blue underline font-semibold disabled:opacity-60"
              >
                Login?
              </button>
            </Typography>
          </div>

          {!isEmailVerified && (
            <Typography
              as="p"
              size="sm"
              className="text-primary-gray text-center"
              weight="normal"
            >
              Didn&apos;t receive the email? Check your spam folder or request a
              new one.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
