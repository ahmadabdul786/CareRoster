'use client';

import { DashboardLayout } from '@/components/dashboard';

export default function HospitalDashboardPage() {
  return (
    <DashboardLayout role="hospital">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-dark-gray mb-4">Hospital Dashboard</h1>
        <p className="text-secondary-gray">Welcome to your hospital dashboard!</p>
      </div>
    </DashboardLayout>
  );
}
