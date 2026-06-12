'use client';

import { createClient } from '@/lib/supabase/client';
import {
  DUPLICATE_EMAIL_MESSAGE,
  formatAuthError,
  getSignUpErrorMessage,
} from '@/lib/supabase/auth-errors';
import { createProfileAfterSignUp } from '@/lib/supabase/auth-actions';
import { isDuplicateSignUp } from '@/lib/supabase/profiles';

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
    await createProfileAfterSignUp({
      id: signUpData.user.id,
      email: input.email,
      full_name: input.fullName,
      role: 'doctor',
    });
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
        hospital_clinic_name: input.hospitalClinicName,
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
    await createProfileAfterSignUp({
      id: signUpData.user.id,
      email: input.email,
      full_name: input.contactPersonName,
      role: 'hospital',
      contact_person_name: input.contactPersonName,
      hospital_clinic_name: input.hospitalClinicName,
    });
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
