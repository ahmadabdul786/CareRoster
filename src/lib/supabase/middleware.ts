import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';
import {
  getDashboardPath,
  getRoleFromUser,
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

export async function updateSession(request: NextRequest) {
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

    const role = getRoleFromUser(user);
    const roleRedirect = getRoleMismatchRedirect(pathname, role, request.url);

    if (roleRedirect) {
      return redirectWithSessionCookies(roleRedirect, supabaseResponse);
    }

    return supabaseResponse;
  }

  if (isAuthRoute(pathname) && user) {
    const role = getRoleFromUser(user);
    return redirectWithSessionCookies(
      new URL(getDashboardPath(role), request.url),
      supabaseResponse,
    );
  }

  return supabaseResponse;
}
