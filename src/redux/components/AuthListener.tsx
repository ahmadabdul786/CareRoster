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
    const supabase = createClient();
    dispatch(setAuthStatus('loading'));

    const syncSession = (session: Session | null) => {
      if (session?.user) {
        dispatch(setUser(mapSupabaseUser(session.user)));
        return;
      }

      dispatch(clearUser());
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      syncSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSession(session);
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return children;
}
