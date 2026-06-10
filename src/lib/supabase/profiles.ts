import type { SupabaseClient } from '@supabase/supabase-js';

export type ProfileRole = 'doctor' | 'hospital';

export type ProfileUpsert = {
  id: string;
  email: string;
  role: ProfileRole;
  full_name?: string | null;
  contact_person_name?: string | null;
  hospital_clinic_name?: string | null;
};

export async function upsertProfile(
  supabase: SupabaseClient,
  profile: ProfileUpsert,
) {
  const { error } = await supabase.from('profiles').upsert(profile, { onConflict: 'id' });

  if (error) {
    console.error('Failed to create profile during signup:', error);
  }
}

export function isDuplicateSignUp(signUpData: {
  user: { identities?: unknown[] | null } | null;
}) {
  return signUpData.user?.identities?.length === 0;
}
