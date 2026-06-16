"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { TextInputField } from "@/components/shared/text-input-field";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema";
import { requestPasswordResetClient } from "@/lib/supabase/client-auth";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = useMemo(() => {
    const error = searchParams.get("error");

    if (error === "expired") {
      return "This reset link has expired or was already used. Request a new one below.";
    }

    if (error === "auth") {
      return "We could not verify your reset link. Request a new one below.";
    }

    return null;
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    const result = await requestPasswordResetClient(data.email);

    if (result.success) {
      toast.success(result.message);
      reset();
      setIsLoading(false);
      return;
    }

    toast.error(result.message);
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 lg:px-6 lg:py-4">
      <div className="w-full max-w-[474px] flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-center">
          <Typography as="h1" size="h1" className="text-primary-dark" weight="semibold">
            Forgot Password?
          </Typography>
          <Typography as="p" size="lg" className="text-muted-gray" weight="normal">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Typography>
        </div>

        {errorMessage && (
          <Typography
            as="p"
            size="md"
            className="text-red-600 text-center"
            weight="normal"
          >
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <TextInputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Send Reset Link
          </Button>
        </form>

        <div className="text-center mt-[8px]">
          <Typography as="p" size="lg" className="text-light-blue ">
            Remember your password?{" "}
            <Link href="/login" className="text-light-blue underline ">
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
