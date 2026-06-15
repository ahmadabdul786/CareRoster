import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

import type { UserRole } from '@/lib/supabase/route-guards';

export type ProfileRole = 'doctor' | 'hospital';

export type DoctorProfileUpsert = {
  user_id: string;
  full_name?: string | null;
};

export type HospitalProfileUpsert = {
  user_id: string;
  contact_person_name?: string | null;
  hospital_name?: string | null;
};

export type ProfileUpsert =
  | ({ role: 'doctor' } & DoctorProfileUpsert)
  | ({ role: 'hospital' } & HospitalProfileUpsert);

export type ProfileRecord = {
  role: ProfileRole;
  full_name: string | null;
  contact_person_name: string | null;
  hospital_name: string | null;
  profile_completed_at: string | null;
};

type DoctorProfileRow = {
  full_name: string | null;
  profile_completed_at: string | null;
};

type HospitalProfileRow = {
  contact_person_name: string | null;
  hospital_name: string | null;
  profile_completed_at: string | null;
};

function readProfileCompletedAt(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

export function isProfileComplete(profile: ProfileRecord | null | undefined) {
  return Boolean(profile?.profile_completed_at);
}

export function normalizeProfileRole(role: unknown): UserRole | undefined {
  return role === 'doctor' || role === 'hospital' ? role : undefined;
}

export async function getProfileByUserId(
  supabase: SupabaseClient,
  userId: string,
): Promise<ProfileRecord | null> {
  const [doctorResult, hospitalResult] = await Promise.all([
    fetchDoctorProfileRow(supabase, userId),
    fetchHospitalProfileRow(supabase, userId),
  ]);

  if (doctorResult.data) {
    return {
      role: 'doctor',
      full_name: doctorResult.data.full_name,
      contact_person_name: null,
      hospital_name: null,
      profile_completed_at: doctorResult.data.profile_completed_at,
    };
  }

  if (hospitalResult.data) {
    return {
      role: 'hospital',
      full_name: null,
      contact_person_name: hospitalResult.data.contact_person_name,
      hospital_name: hospitalResult.data.hospital_name,
      profile_completed_at: hospitalResult.data.profile_completed_at,
    };
  }

  return null;
}

async function fetchDoctorProfileRow(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ data: DoctorProfileRow | null; error: PostgrestError | null }> {
  const withCompletion = await supabase
    .from('doctor_profiles')
    .select('full_name, profile_completed_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (!withCompletion.error && withCompletion.data) {
    return {
      data: {
        full_name: withCompletion.data.full_name,
        profile_completed_at: readProfileCompletedAt(
          withCompletion.data.profile_completed_at,
        ),
      },
      error: null,
    };
  }

  if (!withCompletion.error) {
    return { data: null, error: null };
  }

  const fallback = await supabase
    .from('doctor_profiles')
    .select('full_name')
    .eq('user_id', userId)
    .maybeSingle();

  if (fallback.error || !fallback.data) {
    return { data: null, error: fallback.error ?? withCompletion.error };
  }

  return {
    data: {
      full_name: fallback.data.full_name,
      profile_completed_at: null,
    },
    error: null,
  };
}

async function fetchHospitalProfileRow(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ data: HospitalProfileRow | null; error: PostgrestError | null }> {
  const withCompletion = await supabase
    .from('hospital_profiles')
    .select('contact_person_name, hospital_name, profile_completed_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (!withCompletion.error && withCompletion.data) {
    return {
      data: {
        contact_person_name: withCompletion.data.contact_person_name,
        hospital_name: withCompletion.data.hospital_name,
        profile_completed_at: readProfileCompletedAt(
          withCompletion.data.profile_completed_at,
        ),
      },
      error: null,
    };
  }

  if (!withCompletion.error) {
    return { data: null, error: null };
  }

  const fallback = await supabase
    .from('hospital_profiles')
    .select('contact_person_name, hospital_name')
    .eq('user_id', userId)
    .maybeSingle();

  if (fallback.error || !fallback.data) {
    return { data: null, error: fallback.error ?? withCompletion.error };
  }

  return {
    data: {
      contact_person_name: fallback.data.contact_person_name,
      hospital_name: fallback.data.hospital_name,
      profile_completed_at: null,
    },
    error: null,
  };
}

export async function getProfileRole(
  supabase: SupabaseClient,
  userId: string,
): Promise<UserRole | undefined> {
  const profile = await getProfileByUserId(supabase, userId);
  return profile ? normalizeProfileRole(profile.role) : undefined;
}

export async function insertDoctorProfile(
  supabase: SupabaseClient,
  profile: DoctorProfileUpsert,
) {
  const payload = {
    user_id: profile.user_id,
    full_name: profile.full_name,
  };

  const { data, error } = await supabase.from('doctor_profiles').insert(payload).select('id').single();

  if (error) {
    throw error;
  }
}

export async function insertHospitalProfile(
  supabase: SupabaseClient,
  profile: HospitalProfileUpsert,
) {
  const payload = {
    user_id: profile.user_id,
    contact_person_name: profile.contact_person_name,
    hospital_name: profile.hospital_name,
  };

  const { data, error } = await supabase
    .from('hospital_profiles')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw error;
  }
}

export async function insertProfile(
  supabase: SupabaseClient,
  profile: ProfileUpsert,
) {
  if (profile.role === 'doctor') {
    await insertDoctorProfile(supabase, profile);
    return;
  }

  await insertHospitalProfile(supabase, profile);
}

export function isDuplicateSignUp(signUpData: {
  user: { identities?: unknown[] | null } | null;
}) {
  return signUpData.user?.identities?.length === 0;
}

type UserWithMetadata = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export function buildProfileUpsertFromUser(
  user: UserWithMetadata,
): ProfileUpsert | null {
  const metadata = user.user_metadata ?? {};
  const role = normalizeProfileRole(metadata.role);

  if (!role) {
    return null;
  }

  if (role === 'doctor') {
    return {
      user_id: user.id,
      role: 'doctor',
      full_name: metadata.full_name as string | undefined,
    };
  }

  return {
    user_id: user.id,
    role: 'hospital',
    contact_person_name: metadata.contact_person_name as string | undefined,
    hospital_name: (metadata.hospital_name ??
      metadata.hospital_clinic_name) as string | undefined,
  };
}

export async function markProfileComplete(
  supabase: SupabaseClient,
  userId: string,
  role: ProfileRole,
) {
  const completedAt = new Date().toISOString();
  const table = role === 'doctor' ? 'doctor_profiles' : 'hospital_profiles';

  const { data, error } = await supabase
    .from(table)
    .update({ profile_completed_at: completedAt })
    .eq('user_id', userId)
    .select('user_id')
    .single();

  if (error || !data) {
    throw error;
  }
}

/** Creates a profile row when the user has a session but no profile yet. */
export async function ensureProfileForUser(
  supabase: SupabaseClient,
  user: UserWithMetadata,
): Promise<boolean> {
  const existingProfile = await getProfileByUserId(supabase, user.id);

  if (existingProfile) {
    return true;
  }

  const profile = buildProfileUpsertFromUser(user);

  if (!profile) {
    return false;
  }

  try {
    await insertProfile(supabase, profile);
    return true;
  } catch (error) {
    return false;
  }
}
