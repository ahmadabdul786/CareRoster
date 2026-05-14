export const shiftStatusStyles = {
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
  pending: {
    bg: 'bg-warning-amber/20',
    text: 'text-warning-amber',
    label: 'Pending',
  },
} as const;

export const applicationStatusStyles = {
  accepted: {
    bg: 'bg-success-green/20',
    text: 'text-success-green',
    label: 'Accepted',
  },
  pending: {
    bg: 'bg-warning-amber/20',
    text: 'text-warning-amber',
    label: 'Pending',
  },
  rejected: {
    bg: 'bg-alert-red/20',
    text: 'text-alert-red',
    label: 'Rejected',
  },
} as const;
