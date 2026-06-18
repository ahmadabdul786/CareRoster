import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';

/**
 * Supabase client for route handlers where session cookies must be written
 * onto the outgoing NextResponse (required on Cloudflare Workers / OpenNext).
 */
export async function createSupabaseRouteHandlerClient(response: NextResponse) {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Route handlers can write cookies; Server Components cannot.
          }

          response.cookies.set(name, value, options);
        });
      },
    },
  });
}
