'use client';

import { createClient } from '@/lib/supabase/client';
import {
  DUPLICATE_EMAIL_MESSAGE,
  formatAuthError,
  getSignUpErrorMessage,
} from '@/lib/supabase/auth-errors';
import type { Session } from '@supabase/supabase-js';

import {
  getProfileByUserId,
  insertProfile,
  isDuplicateSignUp,
  type ProfileUpsert,
} from '@/lib/supabase/profiles';

export type ClientAuthResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export type MessageActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

/** Build the email confirmation callback URL using the current browser origin. */
export function getEmailConfirmationCallbackUrl() {
  const next = encodeURIComponent('/verify-email-success');
  return `${window.location.origin}/auth/callback?next=${next}`;
}

/** Build the password reset callback URL using the current browser origin. */
export function getPasswordResetCallbackUrl() {
  const next = encodeURIComponent('/reset-password');
  return `${window.location.origin}/auth/callback?next=${next}&type=recovery`;
}

async function ensureProfileCreated(
  supabase: ReturnType<typeof createClient>,
  profile: ProfileUpsert,
  session: Session | null,
) {
  console.log('[profile] ensureProfileCreated: start', {
    user_id: profile.user_id,
    role: profile.role,
    has_session: Boolean(session),
  });

  // Email confirmation is enabled — no session yet. Profile is created after
  // verification in the auth callback once cookies are established.
  if (!session) {
    console.log(
      '[profile] ensureProfileCreated: skipped — no session yet (profile will be created after email verification)',
      { user_id: profile.user_id, role: profile.role },
    );
    return;
  }

  const existingProfile = await getProfileByUserId(supabase, profile.user_id);

  if (existingProfile) {
    console.log('[profile] ensureProfileCreated: profile already exists', {
      user_id: profile.user_id,
      role: existingProfile.role,
    });
    return;
  }

  try {
    await insertProfile(supabase, profile);
    console.log('[profile] ensureProfileCreated: profile created at signup', {
      user_id: profile.user_id,
      role: profile.role,
    });
  } catch (error) {
    console.error('[profile] ensureProfileCreated: insert failed', {
      user_id: profile.user_id,
      role: profile.role,
      error,
    });
  }
}

export async function signUpDoctorClient(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ClientAuthResult> {
  const supabase = createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        role: 'doctor',
        full_name: input.fullName,
        email: input.email,
      },
      emailRedirectTo: getEmailConfirmationCallbackUrl(),
    },
  });

  if (error) {
    return { success: false, message: getSignUpErrorMessage(error.message) };
  }

  if (isDuplicateSignUp(signUpData)) {
    return { success: false, message: DUPLICATE_EMAIL_MESSAGE };
  }

  if (signUpData.user) {
    console.log('[profile] signUpDoctorClient: auth user created', {
      user_id: signUpData.user.id,
      has_session: Boolean(signUpData.session),
      metadata: signUpData.user.user_metadata,
    });

    await ensureProfileCreated(
      supabase,
      {
        user_id: signUpData.user.id,
        full_name: input.fullName,
        role: 'doctor',
      },
      signUpData.session,
    );
  }

  return { success: true, redirectTo: '/verify-email' };
}

export async function signUpHospitalClient(input: {
  contactPersonName: string;
  hospitalClinicName: string;
  email: string;
  password: string;
}): Promise<ClientAuthResult> {
  const supabase = createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        role: 'hospital',
        contact_person_name: input.contactPersonName,
        hospital_name: input.hospitalClinicName,
        email: input.email,
      },
      emailRedirectTo: getEmailConfirmationCallbackUrl(),
    },
  });

  if (error) {
    return { success: false, message: getSignUpErrorMessage(error.message) };
  }

  if (isDuplicateSignUp(signUpData)) {
    return { success: false, message: DUPLICATE_EMAIL_MESSAGE };
  }

  if (signUpData.user) {
    console.log('[profile] signUpHospitalClient: auth user created', {
      user_id: signUpData.user.id,
      has_session: Boolean(signUpData.session),
      metadata: signUpData.user.user_metadata,
    });

    await ensureProfileCreated(
      supabase,
      {
        user_id: signUpData.user.id,
        role: 'hospital',
        contact_person_name: input.contactPersonName,
        hospital_name: input.hospitalClinicName,
      },
      signUpData.session,
    );
  }

  return { success: true, redirectTo: '/verify-email' };
}

export async function resendVerificationEmailClient(
  email: string,
): Promise<MessageActionResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return { success: false, message: 'Email address is required.' };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: normalizedEmail,
    options: {
      emailRedirectTo: getEmailConfirmationCallbackUrl(),
    },
  });

  if (error) {
    return { success: false, message: formatAuthError(error.message) };
  }

  return {
    success: true,
    message: 'A new verification email has been sent. Please check your inbox.',
  };
}

export async function requestPasswordResetClient(
  email: string,
): Promise<MessageActionResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return { success: false, message: 'Email address is required.' };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
    redirectTo: getPasswordResetCallbackUrl(),
  });

  if (error) {
    return { success: false, message: formatAuthError(error.message) };
  }

  return {
    success: true,
    message: 'If an account exists for this email, a reset link has been sent.',
  };
}
