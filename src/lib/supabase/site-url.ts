import 'server-only';

import { headers } from 'next/headers';

/** Deployed production origin — fallback when env/request host are unavailable. */
export const PRODUCTION_SITE_URL =
  'https://implement-auth-locum-hero-frontend.mrtayyabhanif.workers.dev';

function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, '');
}

function getSiteUrlFromEnv() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!envUrl) {
    return null;
  }

  return normalizeSiteUrl(envUrl);
}

async function getSiteUrlFromRequest() {
  try {
    const headersList = await headers();
    const host =
      headersList.get('x-forwarded-host')?.split(',')[0]?.trim() ??
      headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') ?? 'https';

    if (host && !host.includes('localhost') && !host.startsWith('127.0.0.1')) {
      return normalizeSiteUrl(`${protocol}://${host}`);
    }
  } catch {
    // headers() is unavailable outside a request context
  }

  return null;
}

/**
 * Resolves the public site URL for auth redirects.
 * Priority: NEXT_PUBLIC_SITE_URL env → incoming request host → localhost (dev only).
 */
export async function resolveSiteUrl() {
  const envUrl = getSiteUrlFromEnv();

  if (envUrl) {
    return envUrl;
  }

  const requestUrl = await getSiteUrlFromRequest();

  if (requestUrl) {
    return requestUrl;
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }

  return 'http://localhost:3000';
}

async function getAuthCallbackUrl(next: string) {
  const siteUrl = await resolveSiteUrl();
  return `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`;
}

export async function getEmailConfirmationRedirectUrl() {
  return getAuthCallbackUrl('/verify-email-success');
}

export async function getPasswordResetRedirectUrl() {
  return getAuthCallbackUrl('/reset-password');
}
