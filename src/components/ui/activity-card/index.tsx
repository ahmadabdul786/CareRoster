'use client';

import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Typography } from '@/components/shared/typography';

interface ActivityCardProps {
  icon: PhosphorIcon;
  label: string;
  value: number | string;
  color?: 'blue' | 'green' | 'orange' | 'red';
  className?: string;
}

const colorStyles = {
  blue: {
    border: 'border-l-light-blue',
    icon: 'text-light-blue',
    bg: 'bg-light-blue/10',
  },
  green: {
    border: 'border-l-dark-green',
    icon: 'text-success-green',
    bg: 'bg-success-green/10',
  },
  orange: {
    border: 'border-l-dark-amber',
    icon: 'text-dark-amber',
    bg: 'bg-warning-amber/10',
  },
  red: {
    border: 'border-l-alert-red',
    icon: 'text-alert-red',
    bg: 'bg-alert-red/10',
  },
};

export function ActivityCard({
  icon,
  label,
  value,
  color = 'blue',
  className = '',
}: ActivityCardProps) {
  const styles = colorStyles[color];
  const IconComponent = icon;

  return (
    <div
      className={`
        relative w-full bg-white rounded-xl border border-soft-gray 
        ${styles.border} border-l-[5px] p-3 flex flex-col gap-1
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Icon */}
      <div>
        <IconComponent className={`w-8 h-8 ${styles.icon}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 ">
        <Typography
          as="p"
          size="lg"
          weight="normal"
          className="text-secondary-gray"
        >
          {label}
        </Typography>
        <Typography
          as="h1"
          size="h1"
          weight="semibold"
          className="text-dark-gray leading-none"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}
