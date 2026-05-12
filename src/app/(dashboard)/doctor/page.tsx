'use client';

import { DashboardLayout } from '@/components/dashboard';

export default function DoctorDashboardPage() {
  return (
    <DashboardLayout role="doctor">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-dark-gray mb-4">Doctor Dashboard</h1>
        <p className="text-secondary-gray">Welcome to your doctor dashboard!</p>
      </div>
    </DashboardLayout>
  );
}
