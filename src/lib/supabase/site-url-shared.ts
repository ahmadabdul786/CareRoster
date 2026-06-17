/** Deployed production origin — fallback when env/request host are unavailable. */
export const PRODUCTION_SITE_URL =
  'https://implement-auth-locum-hero-frontend.mrtayyabhanif.workers.dev';

export function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, '');
}

export function getSiteUrlFromEnv() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!envUrl) {
    return null;
  }

  return normalizeSiteUrl(envUrl);
}

function isLocalHost(hostname: string) {
  return hostname.includes('localhost') || hostname.startsWith('127.0.0.1');
}

/**
 * Resolves the public site URL for client-side auth redirects.
 * Priority: NEXT_PUBLIC_SITE_URL → non-local browser origin → production fallback (prod only).
 */
export function resolveClientSiteUrl() {
  const envUrl = getSiteUrlFromEnv();

  if (envUrl) {
    return envUrl;
  }

  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;

    if (!isLocalHost(hostname)) {
      return normalizeSiteUrl(origin);
    }
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }

  if (typeof window !== 'undefined') {
    return normalizeSiteUrl(window.location.origin);
  }

  return 'http://localhost:3000';
}
