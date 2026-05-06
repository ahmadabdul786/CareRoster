'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

type StepStatus = 'active' | 'upcoming' | 'completed';

interface SidebarStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  status?: StepStatus;
}

interface CompleteProfileSidebarProps {
  tag: string;
  title: string;
  description: string;
  steps: SidebarStep[];
  skipHref?: string;
}

const statusStyles: Record<StepStatus, { circle: string; icon: string; text: string }> = {
  active: {
    circle: 'bg-white border border-light-blue',
    icon: 'text-light-blue',
    text: 'text-light-blue',
  },
  completed: {
    circle: 'bg-light-gray border border-light-blue',
    icon: 'text-light-blue',
    text: 'text-secondary-gray',
  },
  upcoming: {
    circle: 'bg-light-gray border border-soft-gray',
    icon: 'text-primary-gray!',
    text: 'text-secondary-gray',
  },
};

export function CompleteProfileSidebar({
  tag,
  title,
  description,
  steps,
  skipHref = '#',
}: CompleteProfileSidebarProps) {
  return (
    <aside className="relative flex h-full min-h-[640px] flex-col px-4 sm:px-8 lg:px-20 bg-light-gray">
      <div className="pt-8 lg:pt-10">
        <Image
          src="/assets/svg/logo.svg"
          alt="Locum Hero"
          width={218}
          height={24}
          className="h-6 w-auto"
          priority
        />
      </div>

      <div className="mt-12 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="h-1 w-4 rounded-full bg-light-blue" />
          <Typography as="span" size="md" weight="semibold" className="uppercase text-dark-gray">
            {tag}
          </Typography>
        </div>
        <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray">
          {title}
        </Typography>
        <Typography as="p" size="lg"  className="text-secondary-gray max-w-md">
          {description}
        </Typography>
      </div>

      <div className="pt-6 relative flex flex-col gap-10">
        <span className="auth-profile-step-line absolute left-5 top-17 h-[240px] w-px" />
        {steps.map((step) => {
          const status: StepStatus = step.status ?? 'upcoming';
          const styles = statusStyles[status];

          return (
            <div key={step.id} className="flex gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${styles.circle}`}
              >
                <Icon icon={step.icon} className={`h-5 w-5 ${styles.icon}`} />
              </div>
              <div>
                <Typography as="h3" size="lg" weight="medium" className={styles.text}>
                  {step.title}
                </Typography>
                <Typography as="p" size="lg" weight="normal" className="text-dark-gray/80">
                  {step.description}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-20 right-0 pb-10">
        <Typography as="p" size="lg" className="inline-flex items-center gap-2 text-primary-gray hover:text-soft-dark cursor-pointer">
          <Typography as="span" size="lg">
            Skip for now
          </Typography>
          <Icon icon="mdi:chevron-right" className="h-4 w-4" />
        </Typography>
      </div>
    </aside>
  );
}
