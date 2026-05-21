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
}

interface CompleteProfileSidebarProps {
  tag: string;
  title: string;
  description: string;
  steps: SidebarStep[];
  currentStep: number;
  onSkip?: () => void;
}

const statusStyles: Record<StepStatus, { circle: string; icon: string; text: string; description: string }> = {
  active: {
    circle: 'bg-white ',
    icon: 'text-light-blue',
    text: 'text-light-blue',
    description: 'text-dark-gray',
  },
  completed: {
    circle: 'bg-lighter-gray ',
    icon: 'text-primary-gray',
    text: 'text-primary-gray',
    description: 'text-primary-gray',
  },
  upcoming: {
    circle: 'bg-lighter-gray',
    icon: 'text-primary-gray',
    text: 'text-primary-gray',
    description: 'text-primary-gray',
  },
};

export function CompleteProfileSidebar({
  tag,
  title,
  description,
  steps,
  currentStep,
  onSkip,
}: CompleteProfileSidebarProps) {
  const getStepStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  const getLineClass = (index: number): string => {
    if (index >= steps.length - 1) return '';
    if (index < currentStep) return 'auth-profile-step-line-gradient';
    return 'auth-profile-step-line-dotted';
  };

  return (
    <aside className="relative flex h-screen flex-col px-4 sm:px-8 lg:px-20 overflow-hidden bg-[#DFDFDF]" >
      <div className="pt-8 lg:pt-10 relative z-10">
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
        <Typography as="p" weight={'normal'} size="lg" className="text-secondary-gray max-w-md">
          {description}
        </Typography>
      </div>

      <div className="pt-[24px] flex flex-col">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const styles = statusStyles[status];
          const lineClass = getLineClass(index);

          return (
            <div key={step.id} className="relative flex gap-4 items-center pb-10 last:pb-0">
              <div className="relative flex flex-col items-center flex-shrink-0">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${styles.circle} z-10 bg-light-gray`}
                >
                  <Icon icon={step.icon} className={`h-5 w-5 ${styles.icon}`} />
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-[44px] h-[calc(100%)] w-0 ${lineClass}`} />
                )}
              </div>
              <div className="flex-1">
                <Typography as="h3" size="lg" weight="semibold" className={styles.text}>
                  {step.title}
                </Typography>
                <Typography as="p" size="lg" weight="normal" className={styles.description}>
                  {step.description}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pb-10">
        <Typography as="p" size="lg" className="inline-flex items-center gap-2 text-primary-gray hover:text-soft-dark cursor-pointer" onClick={onSkip}>
          <Typography as="span" className='underline' size="lg">
            Skip for now
          </Typography>
          <Icon icon="mdi:chevron-right" className="h-4 w-4" />
        </Typography>
      </div>
    </aside>
  );
}
