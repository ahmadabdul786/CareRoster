export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  return url;
}

export function getSupabaseAnonKey() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }
  return key;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

function getAuthCallbackUrl(next: string) {
  return `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`;
}

export function getEmailConfirmationRedirectUrl() {
  return getAuthCallbackUrl('/verify-email-success');
}

export function getPasswordResetRedirectUrl() {
  return getAuthCallbackUrl('/reset-password');
}
