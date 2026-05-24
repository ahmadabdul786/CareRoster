import type { ShiftStatus } from '@/types/hospital';

export const shiftStatusStyles: Record<
  ShiftStatus | 'pending',
  { bg: string; text: string; label: string }
> = {
  draft: {
    bg: 'bg-[#FFE0B2]',
    text: 'text-[#E65100]',
    label: 'Draft',
  },
  published: {
    bg: 'bg-success-green/20',
    text: 'text-success-green',
    label: 'Published',
  },
  filled: {
    bg: 'bg-warning-amber/20',
    text: 'text-warning-amber',
    label: 'Filled',
  },
  cancelled: {
    bg: 'bg-alert-red/10',
    text: 'text-alert-red',
    label: 'Cancelled',
  },
  completed: {
    bg: 'bg-light-blue/10',
    text: 'text-dark-blue',
    label: 'Completed',
  },
  pending: {
    bg: 'bg-warning-amber/20',
    text: 'text-warning-amber',
    label: 'Pending',
  },
};

export const applicationStatusStyles = {
  accepted: {
    bg: 'bg-primary-green',
    text: 'text-dark-green',
    label: 'Accepted',
  },
  pending: {
    bg: 'bg-primary-amber',
    text: 'text-dark-amber',
    label: 'Pending',
  },
  rejected: {
    bg: 'bg-primary-orange',
    text: 'text-dark-orange',
    label: 'Rejected',
  },
  withdrawn: {
    bg: 'bg-light-gray',
    text: 'text-primary-gray',
    label: 'Withdrawn',
  },
} as const;
