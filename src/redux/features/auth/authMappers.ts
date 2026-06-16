export type UserRole = 'doctor' | 'hospital';

export interface AuthUser {
  id: string;
  email: string | undefined;
  role: UserRole | undefined;
  fullName?: string;
  hospitalClinicName?: string;
  profileComplete?: boolean;
  user_metadata: Record<string, unknown>;
}

export function getDashboardPath(role?: UserRole | string) {
  return role === 'hospital' ? '/dashboard/hospital' : '/dashboard/doctor';
}

export {
  getPostAuthPath,
  getProfileSetupPath,
} from '@/lib/supabase/route-guards';
