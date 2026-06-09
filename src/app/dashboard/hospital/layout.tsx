'use client';

import { DashboardLayout } from '@/components/dashboard';

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="hospital">{children}</DashboardLayout>;
}
