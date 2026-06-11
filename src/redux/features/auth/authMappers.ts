import type { User } from '@supabase/supabase-js';

export type UserRole = 'doctor' | 'hospital';

export interface AuthUser {
  id: string;
  email: string | undefined;
  role: UserRole | undefined;
  fullName?: string;
  hospitalClinicName?: string;
  user_metadata: Record<string, unknown>;
}

export function mapSupabaseUser(user: User): AuthUser {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email,
    role: metadata.role as UserRole | undefined,
    fullName: (metadata.full_name ?? metadata.contact_person_name) as
      | string
      | undefined,
    hospitalClinicName: metadata.hospital_clinic_name as string | undefined,
    user_metadata: metadata,
  };
}

export function mapLoginUser(data: {
  id: string;
  email: string | undefined;
  user_metadata: Record<string, unknown>;
}): AuthUser {
  const metadata = data.user_metadata ?? {};

  return {
    id: data.id,
    email: data.email,
    role: metadata.role as UserRole | undefined,
    fullName: (metadata.full_name ?? metadata.contact_person_name) as
      | string
      | undefined,
    hospitalClinicName: metadata.hospital_clinic_name as string | undefined,
    user_metadata: metadata,
  };
}

export function getDashboardPath(role?: UserRole | string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}
