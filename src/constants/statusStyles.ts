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
    bg: 'bg-[#B9F6CA]',
    text: 'text-[#00C853]',
    label: 'Accepted',
  },
  pending: {
    bg: 'bg-[#FFF8E1]',
    text: 'text-[#FFC107]',
    label: 'Pending',
  },
  rejected: {
    bg: 'bg-[#FBE9E7]',
    text: 'text-[#D84315]',
    label: 'Rejected',
  },
  withdrawn: {
    bg: 'bg-[#ECECEC]',
    text: 'text-[#9E9E9E]',
    label: 'Withdrawn',
  },
} as const;
