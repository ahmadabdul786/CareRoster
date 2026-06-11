export type UserRole = 'doctor' | 'hospital';

export function getDashboardPath(role?: UserRole | string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

/** Routes that require an authenticated Supabase session. */
export function isProtectedRoute(pathname: string) {
  return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
}

/** Login/register flows — redirect to dashboard when already signed in. */
export function isAuthRoute(pathname: string) {
  return (
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/register') ||
    pathname === '/forgot-password'
  );
}

/** Auth-related routes that must stay reachable without a prior session. */
export function isPublicAuthRoute(pathname: string) {
  return (
    pathname === '/auth/callback' ||
    pathname.startsWith('/auth/callback/') ||
    pathname === '/verify-email' ||
    pathname === '/verify-email-success' ||
    pathname === '/reset-password'
  );
}

export function getRoleFromUser(user: {
  user_metadata?: Record<string, unknown>;
}): UserRole | undefined {
  const role = user.user_metadata?.role;
  return role === 'doctor' || role === 'hospital' ? role : undefined;
}

export function getRoleMismatchRedirect(
  pathname: string,
  role: UserRole | undefined,
  requestUrl: string,
) {
  if (pathname.startsWith('/dashboard/doctor') && role === 'hospital') {
    return new URL('/dashboard/hospital', requestUrl);
  }

  if (pathname.startsWith('/dashboard/hospital') && role === 'doctor') {
    return new URL('/dashboard/doctor', requestUrl);
  }

  return null;
}
