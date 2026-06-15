'use server';

import { createClient } from '@/lib/supabase/server';
import { isPasswordRecoveryUser } from '@/lib/supabase/auth-recovery';
import { formatAuthError } from '@/lib/supabase/auth-errors';
import {
  getProfileByUserId,
  insertProfile,
  normalizeProfileRole,
  ensureProfileForUser,
  type ProfileUpsert,
} from '@/lib/supabase/profiles';
import { getSafeRedirectPath } from '@/lib/supabase/safe-redirect';
import type { AuthUser } from '@/redux/features/auth/authMappers';

export type AuthActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export type LoginActionResult =
  | {
      success: true;
      data: AuthUser;
      redirectTo: string;
    }
  | { success: false; message: string };

export type MessageActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

type UserRole = 'doctor' | 'hospital';

function getDashboardPath(role?: UserRole | string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

function mapAuthUserFromProfile(
  user: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  },
  profile: Awaited<ReturnType<typeof getProfileByUserId>>,
): AuthUser {
  const metadata = user.user_metadata ?? {};
  const role = profile ? normalizeProfileRole(profile.role) : undefined;

  return {
    id: user.id,
    email: user.email,
    role,
    fullName: (profile?.full_name ??
      profile?.contact_person_name ??
      metadata.full_name ??
      metadata.contact_person_name) as string | undefined,
    hospitalClinicName: (profile?.hospital_name ??
      metadata.hospital_name ??
      metadata.hospital_clinic_name) as string | undefined,
    user_metadata: metadata,
  };
}

export async function getSessionProfile(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || isPasswordRecoveryUser(user)) {
    return null;
  }

  const profile = await getProfileByUserId(supabase, user.id);

  return mapAuthUserFromProfile(user, profile);
}

export async function signIn(
  email: string,
  password: string,
): Promise<LoginActionResult> {
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

    if (!user.email_confirmed_at) {
      await supabase.auth.signOut();
      return {
        success: false,
        message:
          'Please verify your email before signing in. Check your inbox for the verification link.',
      };
    }

    await ensureProfileForUser(supabase, user);

    const profile = await getProfileByUserId(supabase, user.id);
    const role = profile ? normalizeProfileRole(profile.role) : undefined;
    const dashboardPath = getDashboardPath(role);
    const authUser = mapAuthUserFromProfile(user, profile);

    return {
      success: true,
      data: authUser,
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

export async function updatePassword(
  password: string,
): Promise<AuthActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'Your session has expired. Request a new reset link.' };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, message: formatAuthError(error.message) };
  }

  await supabase.auth.signOut();

  return { success: true, redirectTo: '/login?reset=success' };
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

export type CreateProfileResult =
  | { success: true }
  | { success: false; message: string };

export async function createProfileAfterSignUp(
  profile: ProfileUpsert,
): Promise<CreateProfileResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: 'You must be signed in to complete registration.' };
  }

  if (profile.user_id !== user.id) {
    return { success: false, message: 'Profile does not match the signed-in user.' };
  }

  if (!normalizeProfileRole(profile.role)) {
    return { success: false, message: 'Invalid account type.' };
  }

  const existingProfile = await getProfileByUserId(supabase, user.id);

  if (existingProfile) {
    return { success: true };
  }

  try {
    await insertProfile(supabase, profile);
    return { success: true };
  } catch {
    return {
      success: false,
      message: 'Failed to create your profile. Please try again.',
    };
  }
}
