'use client';

import { Typography } from '@/components/shared/typography';
import { DoctorApplicationItem } from '@/types/doctor';
import { applicationStatusStyles } from '@/constants/statusStyles';

export function ApplicationListItem({
  title,
  hospitalName,
  status,
}: DoctorApplicationItem) {
  const statusStyle = applicationStatusStyles[status];

  return (
    <div className="flex flex-col gap-2  py-4 justify-center border-b border-light-gray last:border-b-0 px-4">
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
          className={`px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </Typography>
      </div>
    </div>
  );
}
