alter table public.doctor_profiles
  add column if not exists profile_completed_at timestamptz;

alter table public.hospital_profiles
  add column if not exists profile_completed_at timestamptz;
