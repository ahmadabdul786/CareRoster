'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getDashboardPath } from '@/redux/features/auth/authMappers';
import { useAuth } from '@/redux/features/auth/useAuth';

export function AuthGuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, role, status } = useAuth();

  const isResolving = status === 'loading';
  const shouldRedirect = status === 'authenticated' && isAuthenticated;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(getDashboardPath(role));
    }
  }, [isAuthenticated, role, router, shouldRedirect, status]);

  if (isResolving || shouldRedirect) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center">
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <>{children}</>;
}
