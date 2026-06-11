import { isProtectedRoute } from '@/lib/supabase/route-guards';

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

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return null;
  }

  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return null;
  }

  try {
    const url = new URL(trimmed, 'http://localhost');
    const normalized = `${url.pathname}${url.search}${url.hash}`;

    if (!url.pathname.startsWith('/') || url.pathname.startsWith('//')) {
      return null;
    }

    if (url.pathname.includes('\\')) {
      return null;
    }

    if (!isProtectedRoute(url.pathname)) {
      return null;
    }

    return normalized;
  } catch {
    return null;
  }
}
