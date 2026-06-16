'use server';

import { createClient } from '@/lib/supabase/server';
import {
  getProfileByUserId,
  markProfileComplete,
  normalizeProfileRole,
} from '@/lib/supabase/profiles';
import { getDashboardPath } from '@/lib/supabase/route-guards';

export type CompleteProfileActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export async function completeDoctorProfile(): Promise<CompleteProfileActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, message: 'You must be signed in to save your profile.' };
    }

    const profile = await getProfileByUserId(supabase, user.id);
    const role = profile ? normalizeProfileRole(profile.role) : undefined;

    if (role !== 'doctor') {
      return { success: false, message: 'Only doctor accounts can complete this profile.' };
    }

    await markProfileComplete(supabase, user.id, 'doctor');

    return { success: true, redirectTo: getDashboardPath('doctor') };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save your profile. Please try again.',
    };
  }
}

export async function completeHospitalProfile(): Promise<CompleteProfileActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, message: 'You must be signed in to save your profile.' };
    }

    const profile = await getProfileByUserId(supabase, user.id);
    const role = profile ? normalizeProfileRole(profile.role) : undefined;

    if (role !== 'hospital') {
      return { success: false, message: 'Only hospital accounts can complete this profile.' };
    }

    await markProfileComplete(supabase, user.id, 'hospital');

    return { success: true, redirectTo: getDashboardPath('hospital') };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save your profile. Please try again.',
    };
  }
}
