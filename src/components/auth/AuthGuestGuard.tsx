'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { getPostAuthPath } from '@/redux/features/auth/authMappers';
import { useAuth } from '@/redux/features/auth/useAuth';

export function AuthGuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role, status, user } = useAuth();

  const isResolving = status === 'loading';
  const shouldRedirect = status === 'authenticated' && isAuthenticated;
  const destination = shouldRedirect
    ? getPostAuthPath(role, user?.profileComplete === true)
    : null;
  const isAlreadyOnDestination = Boolean(
    destination && pathname === destination,
  );
  const showBlockingState =
    (isResolving || shouldRedirect) && !isAlreadyOnDestination;

  useEffect(() => {
    if (!shouldRedirect || !destination || isAlreadyOnDestination) {
      return;
    }

    router.replace(destination);
  }, [destination, isAlreadyOnDestination, router, shouldRedirect]);

  if (showBlockingState) {
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
