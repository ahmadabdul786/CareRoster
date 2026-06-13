import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

import {
  getAuthFailureRedirectPath,
  inferAuthCallbackNext,
} from '@/lib/supabase/auth-callback-paths';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const nextParam = searchParams.get('next');
  const next = inferAuthCallbackNext(nextParam, type);

  const redirectOnFailure = (error: 'auth' | 'expired') =>
    NextResponse.redirect(
      `${origin}${getAuthFailureRedirectPath(nextParam, type, error)}`,
    );

  const errorCode = searchParams.get('error_code');
  if (errorCode === 'otp_expired') {
    return redirectOnFailure('expired');
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Route handlers can write cookies; Server Components cannot.
        }
      },
    },
  });

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error('[auth/callback] verifyOtp error:', error.message);
  }

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      console.error('[auth/callback] exchangeCodeForSession error:', error.message);
    } catch (error) {
      console.error('[auth/callback] exchangeCodeForSession threw:', error);
    }
  }

  return redirectOnFailure('auth');
}
