'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-light-gray bg-white px-3 sm:h-[60px] sm:gap-3 sm:px-4 md:px-6">
      {/* Left Side - Hamburger Menu (Mobile) + Logo */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
        {/* Hamburger Menu - Only visible on mobile/tablet */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="-ml-1 shrink-0 rounded-lg p-1.5 transition-colors hover:bg-lighter-soft-gray sm:p-2 lg:hidden"
        >
          <Icon icon="ph:list" className="h-5 w-5 text-dark-gray sm:h-6 sm:w-6" />
        </button>

        {/* Logo */}
        <div className="min-w-0 h-5 w-[100px] sm:h-5.5 sm:w-[130px] md:w-[199px]">
          <Image
            src="/assets/svg/logo.svg"
            alt="Locum Hero"
            width={199}
            height={24}
            className="h-full w-full object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* Right Side - Notification & Profile */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Notification Icon - Circle with border */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-light-blue transition-colors hover:bg-lighter-soft-gray sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        >
          <Icon icon="ph:bell" className="h-5 w-5 text-light-blue sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6" />
        </button>

        {/* Profile Avatar - Image */}
        <button
          type="button"
          aria-label="Profile menu"
          className="h-9 w-9 shrink-0 overflow-hidden rounded-full transition-all hover:ring-2 hover:ring-light-blue/30 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        >
          <Image
            src="/assets/images/profile.jpg"
            alt="Profile"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
