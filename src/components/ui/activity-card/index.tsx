'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

interface ActivityCardProps {
  icon: string;
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
    border: 'border-l-success-green',
    icon: 'text-success-green',
    bg: 'bg-success-green/10',
  },
  orange: {
    border: 'border-l-warning-amber',
    icon: 'text-warning-amber',
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

  return (
    <div
      className={`
        relative w-full h-[168px] bg-white rounded-xl border border-[#E0E0E0] 
        ${styles.border} border-l-[3px] p-6 flex flex-col justify-between
        hover:shadow-md transition-shadow duration-200
        ${className}
      `}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg  flex items-center justify-center`}>
        <Icon icon={icon} className={`w-6 h-6 ${styles.icon}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <Typography
          as="p"
          size="lg"
          weight="normal"
          className="text-secondary-gray"
        >
          {label}
        </Typography>
        <Typography
          as="h3"
          size="h0"
          weight="semibold"
          className="text-dark-gray"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}
