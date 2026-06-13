'use server';

import { createClient } from '@/lib/supabase/server';
import { formatAuthError } from '@/lib/supabase/auth-errors';
import { upsertProfile } from '@/lib/supabase/profiles';
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

function getDashboardPath(role?: UserRole | string) {
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

export async function updatePassword(password: string): Promise<AuthActionResult> {
  const supabase = await createClient();

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

export async function createProfileAfterSignUp(
  profile: Parameters<typeof upsertProfile>[1],
) {
  const supabase = await createClient();
  await upsertProfile(supabase, profile);
}
