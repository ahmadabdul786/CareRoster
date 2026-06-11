'use client';

import { useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';
import { useAppDispatch } from '@/redux/hooks';

import { mapSupabaseUser } from '../features/auth/authMappers';
import { clearUser, setAuthStatus, setUser } from '../features/auth/authSlice';

export function AuthListener({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    try {
      const supabase = createClient();
      dispatch(setAuthStatus('loading'));

      const syncSession = (session: Session | null) => {
        if (session?.user) {
          dispatch(setUser(mapSupabaseUser(session.user)));
          return;
        }

        dispatch(clearUser());
      };

      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        syncSession(session);
      });

      subscription = authSubscription;

      supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          syncSession(session);
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
