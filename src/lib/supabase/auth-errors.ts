export function formatAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('rate limit') || normalized.includes('too many requests')) {
    return 'Too many emails sent. Supabase limits auth emails on the default mail service — wait about an hour, or configure custom SMTP in your Supabase project.';
  }

  return message;
}

export function getSignUpErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes('user already registered') ||
    normalized.includes('already been registered') ||
    normalized.includes('already exists')
  ) {
    return 'A user with this email already exists. Please sign in instead.';
  }

  return formatAuthError(message);
}

export const DUPLICATE_EMAIL_MESSAGE =
  'A user with this email already exists. Please sign in instead.';
