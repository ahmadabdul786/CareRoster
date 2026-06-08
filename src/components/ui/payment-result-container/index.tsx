'use client';

import { Typography } from '@/components/shared/typography';

interface PaymentResultContainerProps {
  title: string;
  subtitle: string;
  actions: React.ReactNode;
  children: React.ReactNode;
}

export function PaymentResultContainer({
  title,
  subtitle,
  actions,
  children,
}: PaymentResultContainerProps) {
  return (
    <div className="w-full h-[248px] bg-white rounded-xl border border-soft-gray p-4 flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4 shrink-0">
        <div>
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
            {title}
          </Typography>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            {subtitle}
          </Typography>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          {actions}
        </div>
      </div>

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
