'use client';

import { createClient } from '@/lib/supabase/client';
import {
  isRegistrationEmailVerified,
  markRegistrationEmailVerified,
} from '@/lib/auth/pending-registration-email';
import {
  DUPLICATE_EMAIL_MESSAGE,
  formatAuthError,
  getSignUpErrorMessage,
  isAlreadyVerifiedAuthError,
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
  | { success: false; message: string; alreadyVerified?: boolean };

export async function getRegistrationEmailVerificationStatus(
  email: string,
): Promise<'verified' | 'pending'> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return 'pending';
  }

  if (isRegistrationEmailVerified(normalizedEmail)) {
    return 'verified';
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user?.email_confirmed_at &&
    user.email?.trim().toLowerCase() === normalizedEmail
  ) {
    markRegistrationEmailVerified(normalizedEmail);
    return 'verified';
  }

  return 'pending';
}

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
  // Email confirmation is enabled — no session yet. Profile is created after
  // verification in the auth callback once cookies are established.
  if (!session) {
    return;
  }

  const existingProfile = await getProfileByUserId(supabase, profile.user_id);

  if (existingProfile) {
    return;
  }

  try {
    await insertProfile(supabase, profile);
  } catch (error) {
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
  const verificationStatus =
    await getRegistrationEmailVerificationStatus(normalizedEmail);

  if (verificationStatus === 'verified') {
    return {
      success: false,
      alreadyVerified: true,
      message:
        'This email has already been verified. Return to login to sign in.',
    };
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: normalizedEmail,
    options: {
      emailRedirectTo: getEmailConfirmationCallbackUrl(),
    },
  });

  if (error) {
    if (isAlreadyVerifiedAuthError(error.message)) {
      markRegistrationEmailVerified(normalizedEmail);

      return {
        success: false,
        alreadyVerified: true,
        message:
          'This email has already been verified. Return to login to sign in.',
      };
    }

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
