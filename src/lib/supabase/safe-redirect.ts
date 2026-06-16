import { isProtectedRoute } from '@/lib/supabase/route-guards';

const ALLOWED_POST_AUTH_PATHS = new Set([
  '/verify-email-success',
  '/reset-password',
  '/verify-email',
]);

function isUnsafeRedirectPath(path: string) {
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)) {
    return true;
  }

  if (!path.startsWith('/') || path.startsWith('//')) {
    return true;
  }

  try {
    const url = new URL(path, 'http://localhost');

    if (!url.pathname.startsWith('/') || url.pathname.startsWith('//')) {
      return true;
    }

    return url.pathname.includes('\\');
  } catch {
    return true;
  }
}

function normalizeRedirectPath(path: string) {
  const url = new URL(path.trim(), 'http://localhost');
  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * Validates a post-login redirect path against open-redirect attacks.
 * Only same-origin relative paths under protected dashboard routes are allowed.
 */
export function getSafeRedirectPath(
  path: string | null | undefined,
): string | null {
  if (!path) {
    return null;
  }

  const trimmed = path.trim();

  if (isUnsafeRedirectPath(trimmed)) {
    return null;
  }

  const normalized = normalizeRedirectPath(trimmed);

  if (!isProtectedRoute(new URL(normalized, 'http://localhost').pathname)) {
    return null;
  }

  return normalized;
}

/**
 * Validates post-auth callback destinations.
 * Allows fixed auth routes and protected dashboard paths only.
 */
export function getSafePostAuthPath(
  path: string | null | undefined,
  fallback: string,
): string {
  if (!path) {
    return fallback;
  }

  const trimmed = path.trim();

  if (isUnsafeRedirectPath(trimmed)) {
    return fallback;
  }

  const normalized = normalizeRedirectPath(trimmed);
  const pathname = new URL(normalized, 'http://localhost').pathname;

  if (ALLOWED_POST_AUTH_PATHS.has(pathname) || isProtectedRoute(pathname)) {
    return normalized;
  }

  return fallback;
}
