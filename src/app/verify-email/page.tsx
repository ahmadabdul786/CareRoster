import { Suspense } from "react";

import { VerifyEmailContent } from "@/components/auth/VerifyEmailContent";
import { Typography } from "@/components/shared/typography";

function VerifyEmailFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <Typography as="p" size="lg" className="text-primary-gray">
        Loading...
      </Typography>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
