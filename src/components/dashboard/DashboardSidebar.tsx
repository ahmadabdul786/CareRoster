'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/shared/typography';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface DashboardSidebarProps {
  role: 'doctor' | 'hospital';
}

const doctorSections: SidebarSection[] = [
  {
    items: [
      { label: 'Dashboard', href: '/doctor', icon: 'ph:house' },
    ],
  },
  {
    title: 'Shifts',
    items: [
      { label: 'Browse Shifts', href: '/doctor/browse-shifts', icon: 'ph:plus-square' },
      { label: 'My Applications', href: '/doctor/my-applications', icon: 'ph:file-text' },
      { label: 'My Shifts', href: '/doctor/my-shifts', icon: 'ph:clock' },
    ],
  },
  {
    items: [
      { label: 'Create Timesheet', href: '/doctor/create-timesheet', icon: 'ph:table' },
      { label: 'My Timesheets', href: '/doctor/my-timesheets', icon: 'ph:grid-nine' },
      { label: 'My Invoices', href: '/doctor/my-invoices', icon: 'ph:invoice' },
    ],
  },
];

const hospitalSections: SidebarSection[] = [
  {
    items: [
      { label: 'Dashboard', href: '/hospital', icon: 'ph:house' },
    ],
  },
  {
    title: 'Shifts',
    items: [
      { label: 'Create Shift', href: '/hospital/create-shift', icon: 'ph:plus-square' },
      { label: 'My Shifts', href: '/hospital/my-shifts', icon: 'ph:clock' },
    ],
  },
];

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const sections = role === 'doctor' ? doctorSections : hospitalSections;

  return (
    <aside className="w-[258px] h-screen lg:h-[calc(100vh-60px)] bg-white  flex flex-col">
      {/* Navigation Sections */}
      <nav className="flex-1 overflow-hidden py-3 px-[6px]">
        {sections.map((section, sectionIndex) => (
          <div 
            key={sectionIndex} 
            className={cn(
              "mb-3",
              section.title && "border-t border-b border-[#ECECEC] py-1.5 -mx-4 px-4 "
            )}
          >
            {section.title && (
              <Typography
                size='sm'
                weight="semibold"
                className="  ml-3 text-dark-gray"
              >
                {section.title}
              </Typography>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3  p-3 rounded-lg transition-all',
                      isActive
                        ? 'bg-light-blue text-white'
                        : 'text-black hover:bg-lighter-soft-gray hover:text-dark-gray'
                    )}
                  >
                    <Icon icon={item.icon} className="w-5 h-5 shrink-0" />
                    <Typography size="md" weight="normal" className="leading-6">
                      {item.label}
                    </Typography>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-[#ECECEC] p-4 space-y-1">
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-2 bg-dark-blue p-3 py-3 rounded-lg transition-all',
            pathname === '/profile'
              ? 'bg-light-blue text-white'
              : 'text-secondary-gray hover:bg-lighter-soft-gray hover:text-dark-gray'
          )}
        >
          <Icon icon="ph:user" className="w-5 h-5 text-white shrink-0" />
          <Typography size="sm" weight="normal" className="leading-6 text-white">
            Profile
          </Typography>
        </Link>
        <button
          className="w-full flex items-center gap-3 py-3 rounded-lg text-secondary-gray hover:bg-lighter-soft-gray hover:text-dark-gray transition-all"
        >
          <Icon icon="ph:sign-out" className="w-5 h-5 text-white shrink-0" style={{ color: "#2196F3" }} />
          <Typography size="sm" weight="normal" className="leading-6">
            Logout
          </Typography>
        </button>
      </div>
    </aside>
  );
}
