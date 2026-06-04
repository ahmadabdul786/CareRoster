export const shiftStatusStyles = {
  published: {
    bg: 'bg-primary-green',
    text: 'text-dark-green',
    label: 'Published',
  },
  filled: {
    bg: 'bg-primary-amber',
    text: 'text-dark-amber',
    label: 'Filled',
  },
  pending: {
    bg: 'bg-primary-amber',
    text: 'text-dark-amber',
    label: 'Pending',
  },
} as const;

export const timesheetInvoiceStatusStyles = {
  generated: {
    bg: 'bg-primary-amber',
    text: 'text-dark-amber',
    label: 'Generated',
  },
  sent: {
    bg: 'bg-primary-green',
    text: 'text-dark-green',
    label: 'Sent',
  },
  pending: {
    bg: 'bg-light-gray',
    text: 'text-secondary-gray',
    label: 'Pending',
  },
} as const;

/** Invoice table status pills — 12px radius, 4px/16px padding */
export const invoiceTableStatusBadgeStyles = {
  generated:
    'flex h-7 w-[108px] items-center justify-start gap-2 rounded-xl bg-primary-amber py-1 px-4 text-sm font-medium leading-none text-dark-amber',
  sent: 'flex h-7 w-24 items-center justify-center gap-2 rounded-xl bg-primary-green py-1 px-4 text-sm font-medium leading-none text-dark-green',
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
