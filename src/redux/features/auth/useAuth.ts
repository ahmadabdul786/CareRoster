'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signOut } from '@/lib/supabase/auth-actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getDashboardPath } from './authMappers';
import {
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  selectUserRole,
} from './authSelectors';
import { clearUser } from './authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectAuthUser);
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);

  const logout = useCallback(async () => {
    await signOut();
    dispatch(clearUser());
    router.push('/login');
    router.refresh();
    toast.success('Signed out successfully');
  }, [dispatch, router]);

  const dashboardPath = getDashboardPath(role);

  return {
    user,
    status,
    isAuthenticated,
    role,
    dashboardPath,
    logout,
  };
}
