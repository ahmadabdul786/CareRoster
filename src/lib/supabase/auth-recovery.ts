import type { User } from '@supabase/supabase-js';

/** True when the user arrived via a password reset email link. */
export function isPasswordRecoveryUser(
  user: Pick<User, 'recovery_sent_at'> | null | undefined,
) {
  return Boolean(user?.recovery_sent_at);
}
