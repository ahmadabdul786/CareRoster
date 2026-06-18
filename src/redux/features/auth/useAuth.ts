'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { signOut as signOutAction } from '@/lib/supabase/auth-actions';
import { createClient } from '@/lib/supabase/client';
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useAppSelector(selectAuthUser);
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);

  const logout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const result = await signOutAction();

      if (!result.success) {
        toast.error(result.message);
        setIsLoggingOut(false);
        return;
      }

      try {
        await createClient().auth.signOut();
      } catch {
        // Server session is already cleared; keep client cache in sync when possible.
      }

      dispatch(clearUser());
      toast.success('Signed out successfully');
      router.refresh();
      router.push(result.redirectTo);
    } catch {
      toast.error('Failed to sign out. Please try again.');
      setIsLoggingOut(false);
    }
  }, [dispatch, isLoggingOut, router]);

  const dashboardPath = getDashboardPath(role);

  return {
    user,
    status,
    isAuthenticated,
    role,
    dashboardPath,
    isLoggingOut,
    logout,
  };
}
