import {
  AUTH_CALLBACK_PATH,
  RESET_PASSWORD_PATH,
  VERIFY_EMAIL_SUCCESS_PATH,
} from '@/lib/supabase/auth-paths';

const ALLOWED_POST_AUTH_PATHS = new Set([
  VERIFY_EMAIL_SUCCESS_PATH,
  RESET_PASSWORD_PATH,
  '/verify-email',
]);

function isAllowedPostAuthPath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return false;
  }

  try {
    const pathname = new URL(path, 'http://localhost').pathname;

    return (
      ALLOWED_POST_AUTH_PATHS.has(pathname) ||
      pathname === '/dashboard' ||
      pathname.startsWith('/dashboard/')
    );
  } catch {
    return false;
  }
}

export function buildAuthCallbackUrl(origin: string, next: string) {
  return `${origin}${AUTH_CALLBACK_PATH}?next=${encodeURIComponent(next)}`;
}

/** Resolve the post-auth destination from callback query params. */
export function inferAuthCallbackNext(
  next: string | null,
  type: string | null,
): string {
  if (next === RESET_PASSWORD_PATH || type === 'recovery') {
    return RESET_PASSWORD_PATH;
  }

  if (next?.startsWith('/') && isAllowedPostAuthPath(next)) {
    return next;
  }

  return VERIFY_EMAIL_SUCCESS_PATH;
}

/** Pick the redirect path after a successful auth callback exchange. */
export function resolvePostAuthDestination(
  next: string | null,
  type: string | null,
  user: { recovery_sent_at?: string | null } | null | undefined,
): string {
  if (user?.recovery_sent_at || type === 'recovery') {
    return RESET_PASSWORD_PATH;
  }

  return inferAuthCallbackNext(next, type);
}

/** Where to send users when the auth callback fails. */
export function getAuthFailureRedirectPath(
  next: string | null,
  type: string | null,
  error: 'auth' | 'expired',
): string {
  const resolvedNext = inferAuthCallbackNext(next, type);

  if (resolvedNext === RESET_PASSWORD_PATH || type === 'recovery') {
    return `/forgot-password?error=${error}`;
  }

  return `/verify-email?error=${error}`;
}
