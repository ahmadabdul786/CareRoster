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

export const timesheetInvoiceStatusStyles = {
  generated: {
    bg: 'bg-warning-amber/20',
    text: 'text-warning-amber',
    label: 'Generated',
  },
  sent: {
    bg: 'bg-[#B9F6CA]',
    text: 'text-[#00C853]',
    label: 'Sent',
  },
  pending: {
    bg: 'bg-light-gray',
    text: 'text-secondary-gray',
    label: 'Pending',
  },
} as const;

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
