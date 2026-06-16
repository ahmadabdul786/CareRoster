import { Suspense } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { Typography } from "@/components/shared/typography";

function LoginFormFallback() {
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
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}
