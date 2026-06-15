'use client';

import { useEffect } from 'react';
import type { AuthChangeEvent } from '@supabase/supabase-js';

import { getSessionProfile } from '@/lib/supabase/auth-actions';
import { isPasswordRecoveryUser } from '@/lib/supabase/auth-recovery';
import { createClient } from '@/lib/supabase/client';
import { useAppDispatch } from '@/redux/hooks';

import { clearUser, setAuthStatus, setUser } from '../features/auth/authSlice';

export function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    const syncAuthenticatedUser = async () => {
      try {
        const authUser = await getSessionProfile();

        if (authUser) {
          dispatch(setUser(authUser));
          return;
        }

        dispatch(clearUser());
      } catch (error) {
        console.error('[AuthListener] Failed to sync profile:', error);
        dispatch(clearUser());
      }
    };

    try {
      const supabase = createClient();
      dispatch(setAuthStatus('loading'));

      const handleAuthChange = async (
        _event: AuthChangeEvent,
        shouldSyncProfile: boolean,
      ) => {
        if (!shouldSyncProfile) {
          dispatch(clearUser());
          return;
        }

        await syncAuthenticatedUser();
      };

      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        const shouldSyncProfile = Boolean(
          session?.user && !isPasswordRecoveryUser(session.user),
        );

        if (event === 'SIGNED_OUT' || !shouldSyncProfile) {
          dispatch(clearUser());
          return;
        }

        await handleAuthChange(event, shouldSyncProfile);
      });

      subscription = authSubscription;

      supabase.auth
        .getUser()
        .then(({ data: { user } }) => {
          if (user && !isPasswordRecoveryUser(user)) {
            return syncAuthenticatedUser();
          }

          dispatch(clearUser());
        })
        .catch((error) => {
          console.error('[AuthListener] Failed to restore auth session:', error);
          dispatch(clearUser());
        });
    } catch (error) {
      console.error('Failed to initialize auth listener:', error);
      dispatch(clearUser());
    }

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  return children;
}
