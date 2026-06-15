export type UserRole = 'doctor' | 'hospital';

export function getDashboardPath(role?: UserRole | string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

export function getProfileSetupPath(role?: UserRole | string) {
  return role === 'hospital' ? '/hospital-profile' : '/doctor-profile';
}

export function getPostAuthPath(
  role?: UserRole | string,
  profileComplete = false,
) {
  return profileComplete
    ? getDashboardPath(role)
    : getProfileSetupPath(role);
}

export function isProfileSetupRoute(pathname: string) {
  return pathname === '/doctor-profile' || pathname === '/hospital-profile';
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

export function getProfileSetupRoleMismatchRedirect(
  pathname: string,
  role: UserRole | undefined,
  requestUrl: string,
) {
  if (pathname === '/doctor-profile' && role === 'hospital') {
    return new URL('/hospital-profile', requestUrl);
  }

  if (pathname === '/hospital-profile' && role === 'doctor') {
    return new URL('/doctor-profile', requestUrl);
  }

  return null;
}
