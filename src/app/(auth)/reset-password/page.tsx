"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { AuthPageFallback } from "@/components/auth/AuthPageFallback";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth.schema";
import { updatePassword } from "@/lib/supabase/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { useAppDispatch } from "@/redux/hooks";
import { clearUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    dispatch(clearUser());

    let settled = false;

    const finish = (hasUser: boolean) => {
      if (settled) {
        return;
      }

      settled = true;

      if (!hasUser) {
        router.replace("/forgot-password?error=auth");
        return;
      }

      setIsCheckingSession(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        finish(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        finish(true);
      }
    });

    const timeoutId = window.setTimeout(async () => {
      if (settled) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      finish(Boolean(session?.user));
    }, 3000);

    return () => {
      settled = true;
      window.clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [dispatch, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (isCheckingSession) {
      return;
    }

    setIsLoading(true);

    const result = await updatePassword(data.password);

    if (result.success) {
      toast.success("Your password has been updated. Please sign in with your new password.");
      router.push(result.redirectTo);
      return;
    }

    toast.error(result.message);
    setIsLoading(false);
  };

  if (isCheckingSession) {
    return <AuthPageFallback />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-4 lg:px-6 lg:py-4">
      <div className="w-full max-w-[474px] flex flex-col gap-6 ">
        <div className="flex flex-col text-center">
          <Typography as="h1" size="h1" className="text-primary-dark" weight="semibold">
            Reset Your Password
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Create a new password to secure your account
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <PasswordInputField
            label="Password"
            placeholder="Enter Password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInputField
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </form>

        <div className="text-center h-[23px] flex items-center justify-center">
          <Typography as="p" size="lg" className="text-light-blue">
            Remember your password?{" "}
            <Link href="/login" className="text-light-blue underline">
              Sign in
            </Link>
          </Typography>
        </div>

        <div className="text-center h-[18px] flex items-center justify-center">
          <Typography as="p" size="sm" className="text-soft-gray" weight="normal">
            Make sure your password is strong and matches in both fields
          </Typography>
        </div>
      </div>
    </div>
  );
}
