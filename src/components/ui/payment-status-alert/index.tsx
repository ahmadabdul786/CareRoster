'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

interface PaymentStatusAlertProps {
  variant: 'success' | 'error';
  message: string;
  className?: string;
}

export function PaymentStatusAlert({ variant, message, className = '' }: PaymentStatusAlertProps) {
  const isSuccess = variant === 'success';

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 sm:p-5 h-full ${
        isSuccess
          ? 'bg-[#E8F5E9] border-success-green/30'
          : 'bg-[#FFEBEE] border-alert-red/30'
      } ${className}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isSuccess ? 'bg-success-green' : 'bg-alert-red'
        }`}
      >
        <Icon
          icon={isSuccess ? 'ph:check-bold' : 'ph:x-bold'}
          className="w-4 h-4 text-white"
        />
      </div>
      <Typography
        as="p"
        size="md"
        weight="medium"
        className={isSuccess ? 'text-success-green' : 'text-alert-red'}
      >
        {message}
      </Typography>
    </div>
  );
}
