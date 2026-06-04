'use client';

import { Typography } from '@/components/shared/typography';
import { DoctorApplicant } from '@/types/hospital';
import { applicationStatusStyles } from '@/constants/statusStyles';

interface ApplicationsTableProps {
  applications: DoctorApplicant[];
  onViewProfile?: (application: DoctorApplicant) => void;
}

export function ApplicationsTable({ applications, onViewProfile }: ApplicationsTableProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-soft-gray overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Doctor
                </Typography>
              </th>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Speciality
                </Typography>
              </th>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Experience
                </Typography>
              </th>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Shift
                </Typography>
              </th>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Status
                </Typography>
              </th>
              <th className="px-4 xl:px-6 py-4 text-left">
                <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => {
              const statusStyle = applicationStatusStyles[application.status];
              return (
                <tr
                  key={index}
                  className="border-t border-light-gray hover:bg-light-gray/10 transition-colors"
                >
                  <td className="px-4 xl:px-6 py-4">
                    <Typography as="p" size="md" weight="normal" className="text-dark-gray">
                      {application.doctorName}
                    </Typography>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <Typography as="p" size="md" weight="normal" className="text-dark-gray">
                      {application.speciality}
                    </Typography>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <Typography as="p" size="md" weight="normal" className="text-dark-gray">
                      {application.experience}
                    </Typography>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <Typography as="p" size="md" weight="normal" className="text-dark-gray">
                      {application.shift}
                    </Typography>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <Typography
                      as="span"
                      size="md"
                      weight="medium"
                      className={`inline-block px-3 xl:px-4 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {statusStyle.label}
                    </Typography>
                  </td>
                  <td className="px-4 xl:px-6 py-4">
                    <button
                      onClick={() => onViewProfile?.(application)}
                      className="text-light-blue text-xs xl:text-sm font-medium hover:underline"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-light-gray">
        {applications.map((application, index) => {
          const statusStyle = applicationStatusStyles[application.status];
          return (
            <div key={index} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Typography as="p" size="sm" weight="semibold" className="text-dark-gray mb-1">
                    {application.doctorName}
                  </Typography>
                  <Typography as="p" size="xs" weight="normal" className="text-secondary-gray">
                    {application.speciality} • {application.experience}
                  </Typography>
                </div>
                <Typography
                  as="span"
                  size="sm"
                  weight="medium"
                  className={`inline-block px-3 py-1 rounded-full shrink-0 ${statusStyle.bg} ${statusStyle.text}`}
                >
                  {statusStyle.label}
                </Typography>
              </div>
              
              <Typography as="p" size="xs" weight="normal" className="text-secondary-gray">
                {application.shift}
              </Typography>
              
              <button
                onClick={() => onViewProfile?.(application)}
                className="text-light-blue text-sm font-medium hover:underline"
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
