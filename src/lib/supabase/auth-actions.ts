'use server';

import { createClient } from '@/lib/supabase/server';
import { DUPLICATE_EMAIL_MESSAGE, formatAuthError, getSignUpErrorMessage } from '@/lib/supabase/auth-errors';
import { getEmailConfirmationRedirectUrl, getPasswordResetRedirectUrl } from '@/lib/supabase/env';
import { isDuplicateSignUp, upsertProfile } from '@/lib/supabase/profiles';
import { getSafeRedirectPath } from '@/lib/supabase/safe-redirect';

export type AuthActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export type LoginActionResult =
  | {
      success: true;
      data: {
        id: string;
        email: string | undefined;
        user_metadata: Record<string, unknown>;
      };
      redirectTo: string;
    }
  | { success: false; message: string };

export type MessageActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

type UserRole = 'doctor' | 'hospital';

function getDashboardPath(role?: string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

export async function signIn(email: string, password: string): Promise<LoginActionResult> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: formatAuthError(error.message) };
    }

    const user = data.user;

    if (!user) {
      return { success: false, message: 'Login failed. Please try again.' };
    }

    const role = user.user_metadata?.role as string | undefined;
    const dashboardPath = getDashboardPath(role);

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata ?? {},
      },
      redirectTo: getSafeRedirectPath(dashboardPath) ?? dashboardPath,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function requestPasswordReset(email: string): Promise<MessageActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: await getPasswordResetRedirectUrl(),
  });

  if (error) {
    return { success: false, message: formatAuthError(error.message) };
  }

  return {
    success: true,
    message: 'If an account exists for this email, a reset link has been sent.',
  };
}

export async function updatePassword(password: string): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, message: formatAuthError(error.message) };
  }

  return { success: true, redirectTo: '/login' };
}

export type SignOutActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export async function signOut(): Promise<SignOutActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      message: 'Failed to sign out. Please try again.',
    };
  }

  return { success: true, redirectTo: '/login' };
}

export async function signUpDoctor(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        role: 'doctor' satisfies UserRole,
        full_name: input.fullName,
        email: input.email,
      },
      emailRedirectTo: await getEmailConfirmationRedirectUrl(),
    },
  });

  if (error) {
    return { success: false, message: getSignUpErrorMessage(error.message) };
  }

  if (isDuplicateSignUp(signUpData)) {
    return { success: false, message: DUPLICATE_EMAIL_MESSAGE };
  }

  if (signUpData.user) {
    await upsertProfile(supabase, {
      id: signUpData.user.id,
      email: input.email,
      full_name: input.fullName,
      role: 'doctor',
    });
  }

  return { success: true, redirectTo: '/verify-email' };
}

export async function signUpHospital(input: {
  contactPersonName: string;
  hospitalClinicName: string;
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        role: 'hospital' satisfies UserRole,
        contact_person_name: input.contactPersonName,
        hospital_clinic_name: input.hospitalClinicName,
        email: input.email,
      },
      emailRedirectTo: await getEmailConfirmationRedirectUrl(),
    },
  });

  if (error) {
    return { success: false, message: getSignUpErrorMessage(error.message) };
  }

  if (isDuplicateSignUp(signUpData)) {
    return { success: false, message: DUPLICATE_EMAIL_MESSAGE };
  }

  if (signUpData.user) {
    await upsertProfile(supabase, {
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
