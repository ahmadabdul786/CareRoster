'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/redux/features/auth/useAuth';

export function AuthGuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, dashboardPath, status } = useAuth();

  useEffect(() => {
    if (status === 'authenticated' && isAuthenticated) {
      router.replace(dashboardPath);
    }
  }, [dashboardPath, isAuthenticated, router, status]);

  return children;
}
