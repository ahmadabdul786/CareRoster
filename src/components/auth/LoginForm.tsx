"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

import { TextInputField } from "@/components/shared/text-input-field";
import { PasswordInputField } from "@/components/shared/password-input-field";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import {
  clearPendingRegistrationEmail,
  getPendingRegistrationEmail,
} from "@/lib/auth/pending-registration-email";
import { signIn } from "@/lib/supabase/auth-actions";
import { getSafeRedirectPath } from "@/lib/supabase/safe-redirect";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

function getLoginDefaultValues(): LoginFormData {
  const email = getPendingRegistrationEmail();

  return {
    email: email ?? "",
    password: "",
  };
}

function getSignInGreeting(name: string | undefined, isFirstSignIn: boolean) {
  if (name) {
    return isFirstSignIn ? `Welcome, ${name}!` : `Welcome back, ${name}!`;
  }

  return isFirstSignIn ? "Welcome!" : "Welcome back!";
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues] = useState(getLoginDefaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const isVerified = searchParams.get("verified") === "true";
  const isResetSuccess = searchParams.get("reset") === "success";

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    const result = await signIn(data.email, data.password);

    if (result.success) {
      clearPendingRegistrationEmail();
      dispatch(setUser(result.data));
      const isFirstSignIn = !result.data.profileComplete;
      toast.success(getSignInGreeting(result.data.fullName, isFirstSignIn));

      const safeRedirect = getSafeRedirectPath(searchParams.get("redirectTo"));
      const destination = result.data.profileComplete
        ? (safeRedirect ?? result.redirectTo)
        : result.redirectTo;

      router.push(destination);
      return;
    }

    toast.error(result.message);
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Typography
        as="h1"
        size="h1"
        className="text-primary-dark mb-6"
        weight="semibold"
      >
        Sign in to your account
      </Typography>

      {isResetSuccess && (
        <Typography
          as="p"
          size="md"
          className="text-primary-gray mb-4 text-center"
        >
          Your password has been updated. Sign in with your new password.
        </Typography>
      )}

      {isVerified && (
        <Typography
          as="p"
          size="md"
          className="text-primary-gray mb-4 text-center"
        >
          Your email has been verified. Sign in with your registered credentials
          to continue.
        </Typography>
      )}

      <form
        className="flex flex-col gap-6 text-primary-dark w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInputField
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col gap-0.5 sm:gap-1">
          <PasswordInputField
            id="password"
            label="Password"
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="w-full flex items-center mt-6">
            <Link
              href="/forgot-password"
              className="text-light-blue hover:underline transition-all cursor-pointer"
            >
              <Typography as="span" size="lg">
                Forgot password?
              </Typography>
            </Link>
          </div>
        </div>

        <Button
          variant="primary"
          size="default"
          type="submit"
          className="bg-dark-blue"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in 
        </Button>

        <div className="w-full py-2 sm:py-3 lg:py-4 text-center text-light-blue">
          <Typography as="p" size="lg" className="auth-register-text">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline transition-all">
              Register today!
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}
