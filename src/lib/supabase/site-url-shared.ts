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

function isLocalSiteUrl(url: string) {
  try {
    return isLocalHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

/**
 * Resolves the public site URL for client-side auth redirects.
 * Priority: live non-local browser origin → non-local NEXT_PUBLIC_SITE_URL → production fallback.
 */
export function resolveClientSiteUrl() {
  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;

    // When the app is open on a deployed domain, always use that origin —
    // even if NEXT_PUBLIC_SITE_URL was baked in as localhost during a local build.
    if (!isLocalHost(hostname)) {
      return normalizeSiteUrl(origin);
    }
  }

  const envUrl = getSiteUrlFromEnv();

  if (envUrl && !isLocalSiteUrl(envUrl)) {
    return envUrl;
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }

  if (typeof window !== 'undefined') {
    return normalizeSiteUrl(window.location.origin);
  }

  return 'http://localhost:3000';
}

/** Resolve the public origin for server-side redirects (e.g. auth callback). */
export function resolveRequestOrigin(request: Request) {
  const url = new URL(request.url);
  const forwardedHost = request.headers
    .get('x-forwarded-host')
    ?.split(',')[0]
    ?.trim();
  const forwardedProto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ??
    'https';

  if (forwardedHost) {
    return normalizeSiteUrl(`${forwardedProto}://${forwardedHost}`);
  }

  const envUrl = getSiteUrlFromEnv();

  if (envUrl && !isLocalSiteUrl(envUrl)) {
    return envUrl;
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }

  return normalizeSiteUrl(url.origin);
}
