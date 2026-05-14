'use client';

import { Typography } from '@/components/shared/typography';

interface ApplicationListItemProps {
  title: string;
  hospitalName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const statusStyles = {
  pending: 'bg-warning-amber/10 text-warning-amber',
  accepted: 'bg-success-green/10 text-success-green',
  rejected: 'bg-alert-red/10 text-alert-red',
};

const statusLabels = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

export function ApplicationListItem({
  title,
  hospitalName,
  status,
}: ApplicationListItemProps) {
  return (
    <div className="flex flex-col gap-2 h-[80px] justify-center border-b border-light-gray last:border-b-0 px-4">
      {/* Application Details */}
      <div className="flex flex-col gap-1">
        <Typography
          as="h3"
          size="md"
          weight="semibold"
          className="text-dark-gray leading-4"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          size="md"
          weight="normal"
          className="text-light-blue leading-[18px]"
        >
          {hospitalName}
        </Typography>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <Typography
          as="span"
          size="md"
          weight="normal"
          className="text-secondary-gray"
        >
          Status:
        </Typography>
        <Typography
         as="span"
          size="md"
          weight="medium"
          className={`px-3 py-1 rounded-full   ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </Typography>
      </div>
    </div>
  );
}
