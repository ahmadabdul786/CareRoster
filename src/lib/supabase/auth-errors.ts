export function isAlreadyVerifiedAuthError(message: string) {
  const normalized = message.toLowerCase();

  return (
    normalized.includes('already confirmed') ||
    normalized.includes('already verified') ||
    normalized.includes('email address has already been verified') ||
    normalized.includes('user already registered')
  );
}

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
    return 'Unable to create an account with this email. If you already have an account, please sign in.';
  }

  return formatAuthError(message);
}

export const DUPLICATE_EMAIL_MESSAGE =
  'Unable to create an account with this email. If you already have an account, please sign in.';
