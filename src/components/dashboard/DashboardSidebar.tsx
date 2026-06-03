'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { ClockUserIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/shared/typography';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  iconComponent?: PhosphorIcon;
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
      { label: 'My Shifts', href: '/doctor/my-shifts', icon: 'ph:clock', iconComponent: ClockUserIcon },
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
      { label: 'My Shifts', href: '/hospital/my-shifts', icon: 'ph:clock', iconComponent: ClockUserIcon },
      { label: 'Applications', href: '/hospital/applications', icon: 'ph:file-text' },
    ],
  },
];

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const sections = role === 'doctor' ? doctorSections : hospitalSections;
  const profileHref = role === 'doctor' ? '/doctor/profile' : '/hospital/profile';

  return (
    <aside className="w-[258px] h-screen lg:h-[calc(100vh-60px)] bg-white  flex flex-col">
      {/* Navigation Sections */}
      <nav className="flex-1 overflow-hidden  px-[6px]">
        {sections.map((section, sectionIndex) => (
          <div 
            key={sectionIndex} 
            className={cn(
              "my-2",
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
                const ItemIcon = item.iconComponent;
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
                    {ItemIcon ? (
                      <ItemIcon className="w-5 h-5 shrink-0" />
                    ) : (
                      <Icon icon={item.icon} className="w-5 h-5 shrink-0" />
                    )}
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
      <div className="border-t border-[#ECECEC] px-[6px] pt-1 space-y-1">
        <Link
          href={profileHref}
          className={cn(
            'flex items-center gap-2 bg-dark-blue p-3 py-3 rounded-lg transition-all',
            pathname === profileHref
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
          type="button"
          onClick={() => setIsLogoutClicked(true)}
          className={cn(
            'w-full flex items-center gap-2 p-3 py-3 rounded-lg transition-all',
            isLogoutClicked
              ? 'bg-dark-blue text-white'
              : 'text-secondary-gray hover:bg-lighter-soft-gray hover:text-dark-gray'
          )}
        >
          <Icon
            icon="ph:sign-out"
            className={cn('w-5 h-5 shrink-0', isLogoutClicked ? 'text-white' : 'text-dark-gray')}
          />
          <Typography
            size="sm"
            weight="normal"
            className={cn('leading-6 text-dark-gray', isLogoutClicked && 'text-white')}
          >
            Logout
          </Typography>
        </button>
      </div>
    </aside>
  );
}
