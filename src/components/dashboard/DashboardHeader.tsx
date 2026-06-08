'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-[60px] bg-white border-b border-[#ECECEC] flex items-center justify-between px-6">
      {/* Left Side - Hamburger Menu (Mobile) + Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-lighter-soft-gray rounded-lg transition-colors"
        >
          <Icon icon="ph:list" className="w-6 h-6 text-dark-gray" />
        </button>

        {/* Logo */}
        <Image
          src="/assets/svg/logo.svg"
          alt="Locum Hero"
          width={150}
          height={24}
          className="h-6 w-auto"
          priority
        />
      </div>

      {/* Right Side - Notification & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Icon - Circle with border */}
        <button className="relative w-12 h-12 rounded-full border-2 border-light-blue flex items-center justify-center hover:bg-lighter-soft-gray transition-colors">
          <Icon icon="ph:bell" className="w-6 h-6 text-light-blue" />
        </button>

        {/* Profile Avatar - Image */}
        <button className="w-12 h-12 rounded-full overflow-hidden hover:ring-2 hover:ring-light-blue/30 transition-all">
          <Image
            src="/assets/images/profile.jpg"
            alt="Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
