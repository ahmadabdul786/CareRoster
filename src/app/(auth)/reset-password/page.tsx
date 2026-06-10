"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/schemas/auth.schema";
import { updatePassword } from "@/lib/supabase/auth-actions";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setServerError(null);
    setIsLoading(true);

    const result = await updatePassword(data.password);

    if (result.success) {
      router.push(result.redirectTo);
      router.refresh();
      return;
    }

    setServerError(result.message);
    setIsLoading(false);
  };

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

          {serverError && (
            <Typography as="p" size="sm" className="text-red-500 text-center">
              {serverError}
            </Typography>
          )}

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
