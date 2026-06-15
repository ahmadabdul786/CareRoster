-- Role-specific profile tables.
-- `id` is a random row id; `user_id` links to auth.users.

create table if not exists public.doctor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hospital_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  contact_person_name text,
  hospital_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.doctor_profiles enable row level security;
alter table public.hospital_profiles enable row level security;

create policy "Doctors can view own profile"
  on public.doctor_profiles
  for select
  using (auth.uid() = user_id);

create policy "Doctors can insert own profile"
  on public.doctor_profiles
  for insert
  with check (auth.uid() = user_id);

create policy "Doctors can update own profile"
  on public.doctor_profiles
  for update
  using (auth.uid() = user_id);

create policy "Hospitals can view own profile"
  on public.hospital_profiles
  for select
  using (auth.uid() = user_id);

create policy "Hospitals can insert own profile"
  on public.hospital_profiles
  for insert
  with check (auth.uid() = user_id);

create policy "Hospitals can update own profile"
  on public.hospital_profiles
  for update
  using (auth.uid() = user_id);
