'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

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
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error('Failed to sign out. Please try again.');
        setIsLoggingOut(false);
        return;
      }

      dispatch(clearUser());
      toast.success('Signed out successfully');

      // Full page navigation ensures middleware sees the cleared session.
      window.location.assign('/login');
    } catch {
      toast.error('Failed to sign out. Please try again.');
      setIsLoggingOut(false);
    }
  }, [dispatch, isLoggingOut]);

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
