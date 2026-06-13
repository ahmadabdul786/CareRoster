export const AUTH_CALLBACK_PATH = '/auth/callback';

export function buildAuthCallbackUrl(origin: string, next: string) {
  return `${origin}${AUTH_CALLBACK_PATH}?next=${encodeURIComponent(next)}`;
}

/** Resolve the post-auth destination from callback query params. */
export function inferAuthCallbackNext(
  next: string | null,
  type: string | null,
): string {
  if (next?.startsWith('/')) {
    return next;
  }

  if (type === 'recovery') {
    return '/reset-password';
  }

  return '/verify-email-success';
}

/** Where to send users when the auth callback fails. */
export function getAuthFailureRedirectPath(
  next: string | null,
  type: string | null,
  error: 'auth' | 'expired',
): string {
  const resolvedNext = inferAuthCallbackNext(next, type);

  if (resolvedNext === '/reset-password' || type === 'recovery') {
    return `/forgot-password?error=${error}`;
  }

  return `/verify-email?error=${error}`;
}
