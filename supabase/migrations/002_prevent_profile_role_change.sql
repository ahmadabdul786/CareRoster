-- Prevent users from changing their role after initial profile creation.

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
as $$
begin
  if old.role is distinct from new.role then
    raise exception 'Profile role cannot be changed';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_profile_role_immutability on public.profiles;

create trigger enforce_profile_role_immutability
  before update on public.profiles
  for each row
  execute function public.prevent_profile_role_change();
