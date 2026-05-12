'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'doctor' | 'hospital';
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-lighter-soft-gray">
      {/* Header */}
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <DashboardSidebar role={role} />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-auto h-[calc(100vh-60px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
