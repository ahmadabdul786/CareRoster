'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { getPostAuthPath } from '@/redux/features/auth/authMappers';
import { useAuth } from '@/redux/features/auth/useAuth';

export function AuthGuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role, user, status } = useAuth();
  const isAuthResolved = status !== 'idle' && status !== 'loading';

  const destination =
    isAuthResolved && isAuthenticated
      ? getPostAuthPath(role, user?.profileComplete === true)
      : null;
  const isAlreadyOnDestination = Boolean(
    destination && pathname === destination,
  );

  useEffect(() => {
    if (!isAuthenticated || !destination || isAlreadyOnDestination) {
      return;
    }

    router.replace(destination);
  }, [destination, isAlreadyOnDestination, isAuthenticated, isAuthResolved, router]);

  return <>{children}</>;
}
