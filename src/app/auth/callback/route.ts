import { NextResponse } from 'next/server';
import type { EmailOtpType, User } from '@supabase/supabase-js';

import {
  getAuthFailureRedirectPath,
  resolvePostAuthDestination,
} from '@/lib/supabase/auth-callback-paths';
import { isRecoveryAuthCallback } from '@/lib/supabase/auth-recovery';
import { ensureProfileForUser } from '@/lib/supabase/profiles';
import { createSupabaseRouteHandlerClient } from '@/lib/supabase/route-handler-client';
import { resolveRequestOrigin } from '@/lib/supabase/site-url-shared';

async function completeAuthCallback(
  supabase: Awaited<ReturnType<typeof createSupabaseRouteHandlerClient>>,
  user: User | null | undefined,
  nextParam: string | null,
  type: string | null,
  origin: string,
  response: NextResponse,
) {
  if (user) {
    await ensureProfileForUser(supabase, user);
  }

  const isRecoveryFlow = isRecoveryAuthCallback(type, user);

  if (!isRecoveryFlow) {
    await supabase.auth.signOut();
  }

  const next = resolvePostAuthDestination(nextParam, type, user);
  response.headers.set('Location', `${origin}${next}`);

  return response;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const nextParam = searchParams.get('next');
  const origin = resolveRequestOrigin(request);

  const failurePath = `${origin}${getAuthFailureRedirectPath(nextParam, type, 'auth')}`;
  const response = NextResponse.redirect(failurePath);

  const redirectOnFailure = (error: 'auth' | 'expired') => {
    response.headers.set(
      'Location',
      `${origin}${getAuthFailureRedirectPath(nextParam, type, error)}`,
    );
    return response;
  };

  const errorCode = searchParams.get('error_code');
  if (errorCode === 'otp_expired') {
    return redirectOnFailure('expired');
  }

  const supabase = await createSupabaseRouteHandlerClient(response);

  if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    });

    if (!error) {
      const user = data.user ?? data.session?.user;
      return completeAuthCallback(
        supabase,
        user,
        nextParam,
        type,
        origin,
        response,
      );
    }
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const user = data.session?.user;
      return completeAuthCallback(
        supabase,
        user,
        nextParam,
        type,
        origin,
        response,
      );
    }
  }

  return redirectOnFailure('auth');
}
