'use client';

import { CheckCircle, XCircle } from '@phosphor-icons/react';

interface PaymentStatusAlertProps {
  variant: 'success' | 'error';
  message: string;
  className?: string;
}

const variantStyles = {
  success: {
    container: 'border border-[#00C8534D] bg-[#B9F6CA33]',
    text: 'text-[#00C853]',
    icon: 'text-[#00C853]',
  },
  error: {
    container: 'border border-[#D843154D] bg-[#FBE9E733]',
    text: 'text-[#D84315]',
    icon: 'text-[#D84315]',
  },
} as const;

export function PaymentStatusAlert({ variant, message, className = '' }: PaymentStatusAlertProps) {
  const styles = variantStyles[variant];
  const IconComponent = variant === 'success' ? CheckCircle : XCircle;

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border p-4 ${styles.container} ${className}`}
    >
      <IconComponent size={32} weight="regular" className={`shrink-0 ${styles.icon}`} />
      <p
        className={`font-roboto font-normal text-[18px] leading-[150%] tracking-normal ${styles.text}`}
      >
        {message}
      </p>
    </div>
  );
}
