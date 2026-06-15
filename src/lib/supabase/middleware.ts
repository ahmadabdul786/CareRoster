import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import {
  AUTH_CALLBACK_PATH,
  RESET_PASSWORD_PATH,
} from '@/lib/supabase/auth-paths';
import {
  getAuthFailureRedirectPath,
  inferAuthCallbackNext,
} from '@/lib/supabase/auth-callback-paths';
import { isPasswordRecoveryUser } from '@/lib/supabase/auth-recovery';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';
import { getProfileRole } from '@/lib/supabase/profiles';
import {
  getDashboardPath,
  getRoleMismatchRedirect,
  isAuthRoute,
  isProtectedRoute,
} from '@/lib/supabase/route-guards';
import { getSafeRedirectPath } from '@/lib/supabase/safe-redirect';

function redirectWithSessionCookies(
  url: URL,
  supabaseResponse: NextResponse,
) {
  const redirectResponse = NextResponse.redirect(url);

  supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
    redirectResponse.cookies.set(name, value, options);
  });

  return redirectResponse;
}

function redirectSupabaseAuthErrors(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname !== '/') {
    return null;
  }

  const errorCode = request.nextUrl.searchParams.get('error_code');

  if (errorCode !== 'otp_expired') {
    return null;
  }

  const type = request.nextUrl.searchParams.get('type');
  const next = request.nextUrl.searchParams.get('next');
  const failurePath = getAuthFailureRedirectPath(next, type, 'expired');

  return NextResponse.redirect(new URL(failurePath, request.url));
}

function redirectAuthCodeToCallback(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const code = request.nextUrl.searchParams.get('code');

  if (!code || pathname === AUTH_CALLBACK_PATH) {
    return null;
  }

  const type = request.nextUrl.searchParams.get('type');
  const nextParam = request.nextUrl.searchParams.get('next');
  const callbackUrl = request.nextUrl.clone();

  callbackUrl.pathname = AUTH_CALLBACK_PATH;

  if (!callbackUrl.searchParams.has('next')) {
    callbackUrl.searchParams.set(
      'next',
      inferAuthCallbackNext(nextParam, type),
    );
  }

  return NextResponse.redirect(callbackUrl);
}

export async function updateSession(request: NextRequest) {
  const supabaseErrorRedirect = redirectSupabaseAuthErrors(request);

  if (supabaseErrorRedirect) {
    return supabaseErrorRedirect;
  }

  const authCodeRedirect = redirectAuthCodeToCallback(request);

  if (authCodeRedirect) {
    return authCodeRedirect;
  }

  let supabaseResponse = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && isPasswordRecoveryUser(user)) {
    if (
      pathname === '/verify-email-success' ||
      isProtectedRoute(pathname) ||
      (isAuthRoute(pathname) && pathname !== '/forgot-password')
    ) {
      return redirectWithSessionCookies(
        new URL(RESET_PASSWORD_PATH, request.url),
        supabaseResponse,
      );
    }
  }

  if (isProtectedRoute(pathname)) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.delete('redirectTo');

      const safeRedirect = getSafeRedirectPath(pathname);
      if (safeRedirect) {
        loginUrl.searchParams.set('redirectTo', safeRedirect);
      }

      return redirectWithSessionCookies(loginUrl, supabaseResponse);
    }

    const role = await getProfileRole(supabase, user.id);
    const roleRedirect = getRoleMismatchRedirect(pathname, role, request.url);

    if (roleRedirect) {
      return redirectWithSessionCookies(roleRedirect, supabaseResponse);
    }

    return supabaseResponse;
  }

  if (isAuthRoute(pathname) && user?.email_confirmed_at) {
    const role = await getProfileRole(supabase, user.id);
    return redirectWithSessionCookies(
      new URL(getDashboardPath(role), request.url),
      supabaseResponse,
    );
  }

  return supabaseResponse;
}
