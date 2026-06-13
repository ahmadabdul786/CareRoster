import { Suspense } from "react";

import ForgotPasswordContent from "./ForgotPasswordContent";
import { Typography } from "@/components/shared/typography";

function ForgotPasswordFallback() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6">
      <Typography as="p" size="lg" className="text-primary-gray">
        Loading...
      </Typography>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordFallback />}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
