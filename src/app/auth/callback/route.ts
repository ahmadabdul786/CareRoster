import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

function getSafeNextPath(next: string | null) {
  if (next?.startsWith('/')) {
    return next;
  }

  return '/verify-email-success';
}

function redirectToVerifyEmail(origin: string, error: 'auth' | 'expired') {
  return NextResponse.redirect(`${origin}/verify-email?error=${error}`);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = getSafeNextPath(searchParams.get('next'));

  const errorCode = searchParams.get('error_code');
  if (errorCode === 'otp_expired') {
    return redirectToVerifyEmail(origin, 'expired');
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

  return redirectToVerifyEmail(origin, 'auth');
}
