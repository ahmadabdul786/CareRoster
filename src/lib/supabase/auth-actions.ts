'use server';

import { createClient } from '@/lib/supabase/server';

export type AuthActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

function getDashboardPath(role?: string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

export async function signIn(email: string, password: string): Promise<AuthActionResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  const role = data.user?.user_metadata?.role as string | undefined;

  return {
    success: true,
    redirectTo: getDashboardPath(role),
  };
}
