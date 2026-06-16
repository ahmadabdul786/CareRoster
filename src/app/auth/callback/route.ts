import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

import {
  getAuthFailureRedirectPath,
  resolvePostAuthDestination,
} from '@/lib/supabase/auth-callback-paths';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';
import { ensureProfileForUser } from '@/lib/supabase/profiles';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const nextParam = searchParams.get('next');

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
    const { data, error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    });

    if (!error) {
      const user = data.user ?? data.session?.user;

      if (user) {
        await ensureProfileForUser(supabase, user);
      }

      const next = resolvePostAuthDestination(
        nextParam,
        type,
        user,
      );
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  if (code) {
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const user = data.session?.user;

        if (user) {
          await ensureProfileForUser(supabase, user);
        }

        const next = resolvePostAuthDestination(
          nextParam,
          type,
          user,
        );
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (error) {
    }
  }

  return redirectOnFailure('auth');
}
