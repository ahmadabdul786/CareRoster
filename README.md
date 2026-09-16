# CareRoster

CareRoster is a Next.js healthcare staffing platform  for Australian locum work. Hospitals struggle to fill short-notice clinical shifts; doctors need a reliable way to find, apply for, and bill that work. This application gives both sides a role-specific product: hospitals can draft and publish shifts, doctors can browse opportunities, track applications, log hours, and generate invoices — with a real authentication and onboarding path, and a production-ready UI for the staffing workflows that are still backed by mock and client-side data.

## Goals and key functionality

**Live against Supabase (auth and account setup)**

- Email/password registration for **doctor** or **hospital** accounts
- Email verification, login (blocked until the email is confirmed), password reset
- Role stored on the user and in role-specific profile tables
- Mandatory two-step “complete profile” flow before the dashboard
- Middleware and client guards that keep users on the correct role and setup step

**Implemented as product UI (mock data or `localStorage`, not the database)**

- **Doctor:** dashboard, browse shifts (filters/sort UI), applications, assigned shifts, timesheets, invoices with client-side PDF download
- **Hospital:** dashboard, create/edit shift, simulated publish-after-payment screens, my shifts with status filters, shift detail with applicant cards and PDF document preview
- Shared dashboard chrome (header, role-based sidebar, mobile overlay)

## My role

I am the **frontend / software engineer** on CareRoster. I designed and implemented the Next.js App Router surface, the Supabase auth and profile integration (including Cloudflare-aware redirects), role-based routing, form validation, dashboard UX, and the client-side staffing flows that the UI currently demonstrates.

## Architecture

The app is a **Next.js 16 App Router** frontend. There is no custom application API for domain data. Supabase Auth and Postgres are used for identity and profile rows. Staffing features (shifts, applications, timesheets, invoices) are UI plus in-memory mock constants, with hospital-created shifts persisted in `localStorage`.

```
Browser
  │
  ├─ Auth pages (login, register, forgot/reset password, verify email)
  ├─ Profile setup (/doctor-profile, /hospital-profile)
  └─ Role dashboards (/dashboard/doctor/*, /dashboard/hospital/*)
        │
        ├─ Redux (session user only)
        ├─ Server Actions (sign-in, sign-out, password update, mark profile complete)
        └─ Browser Supabase client (sign-up, resend, password reset)
              │
Next.js middleware  ── cookie session refresh, route/role/profile gates
  │
Supabase Auth + Postgres (doctor_profiles / hospital_profiles, RLS)
```

**Request path for protected pages:** middleware refreshes the Supabase cookie session, loads the role profile, and redirects unauthenticated, incomplete, or wrong-role users before the page renders. A client `AuthListener` then hydrates Redux from `getSessionProfile()`.

## Technologies actually used

| Area | What the code uses |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, custom CSS variables in `src/app/globals.css`, Poppins + Roboto via `next/font` |
| UI | Custom shared components; Iconify + Phosphor (+ Lucide in a few places); Sonner toasts; `react-slick` on the auth carousel; `react-select` for phone country and suburb search |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| Auth / DB | `@supabase/ssr`, `@supabase/supabase-js` |
| Client session | Redux Toolkit (`auth` slice) + `react-redux` |
| Documents / PDF | `react-pdf` (applicant docs), `html2canvas` + `jspdf` (invoice download) |
| Deploy | OpenNext Cloudflare (`@opennextjs/cloudflare`, Wrangler) |

**Present in `package.json` but not used by application features:** RTK Query (`apiSlice` still points at JSONPlaceholder and is never consumed), `react-select-country-list`, `next-themes` (no theme provider; `useTheme` only inside the Sonner wrapper), shadcn calendar/popover primitives (not wired into pages), and the unused `data-table` / `sidebar` / `dashboard-wrapper` components.

## Authentication and authorization

**Authentication (implemented)**

- Sign-up stores `role` and display fields in `user_metadata` and emails a confirmation link to `/auth/callback`
- `/auth/callback` exchanges a `code` or verifies `token_hash` OTP, ensures a profile row exists, then **signs out** (except recovery) so the user logs in after verifying
- Login uses the `signIn` server action; unconfirmed emails cannot stay signed in
- Forgot password / reset password use recovery callbacks; middleware forces recovery users onto `/reset-password`
- Guest auth pages use `AuthGuestGuard` to bounce already-authenticated users to setup or dashboard

**Authorization (implemented)**

- Roles: `doctor` | `hospital` only
- `/dashboard/*` requires a session; incomplete profiles are sent to `/doctor-profile` or `/hospital-profile`
- Doctors cannot open hospital dashboard routes (and vice versa); the same applies to the two setup URLs
- Postgres trigger `prevent_profile_role_change` blocks role updates on `public.profiles`
- RLS: users can select/insert/update only their own `doctor_profiles` or `hospital_profiles` row
- Login `redirectTo` is sanitized in `getSafeRedirectPath` (relative dashboard paths only)

There is no admin role, no row-level authorization for shifts or applications, and no Supabase Storage.

## Database and backend integration

SQL lives in `supabase/migrations/` and is intended to be run in the Supabase SQL editor (not wired as a CLI migrate script in this repo).

| Migration | What it creates |
| --- | --- |
| `001_create_profiles.sql` | Legacy `public.profiles` table + RLS (the app does **not** query this table) |
| `002_prevent_profile_role_change.sql` | Trigger on `public.profiles` |
| `003_create_role_profiles.sql` | `doctor_profiles` and `hospital_profiles` (what the app actually uses) |
| `004_add_profile_completed_at.sql` | `profile_completed_at` on both role tables |

Application profile helpers (`src/lib/supabase/profiles.ts`) read/write `doctor_profiles` / `hospital_profiles`. Completing onboarding only sets `profile_completed_at`; AHPRA numbers, documents, ABN, and similar form fields are **not** persisted. Uploaded files never go to storage.

The only App Router API handler is `GET /api/documents/[filename]`, which serves static PDFs from `public/assets/documents/` for applicant document preview (basename-only, `.pdf` only).

## Important engineering decisions

1. **Auth is real; marketplace data is not yet.** Middleware, cookies, RLS, and server actions are production-shaped. Shifts and billing stay mock so the UI could ship independently of a domain schema.
2. **Verify, then login.** After email confirmation the callback and success page clear the session. That avoids half-confirmed cookie sessions and makes “please sign in” the single post-verify path.
3. **Site URL is resolved at runtime**, not only at build time (`src/lib/supabase/site-url-shared.ts`). Deployed hosts win over a localhost `NEXT_PUBLIC_SITE_URL`, which matters for Cloudflare Workers and email redirect links.
4. **Profile completion is a timestamp gate**, not a full profile write. The UI collects documents and details; the server only marks the row complete so routing can proceed.
5. **Hospital shift drafts use `localStorage`** (`locum-hero-hospital-shifts`) merged with mock seed data so create/edit/publish can be demoed without a shifts table.
6. **Publish is not a payment integration.** “Pay and publish” navigates to success/failed routes; success flips the local shift status to `published`. A `?payment=failed` query can force the failure screen.
7. **Security headers** in `next.config.ts`: `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, camera/microphone/geolocation disabled.

## Project structure

```
src/
  app/                    # App Router pages and /auth/callback, /api/documents
    (auth)/               # login, register, forgot-password, reset-password
    dashboard/doctor/     # doctor product screens
    dashboard/hospital/   # hospital product screens
  components/
    auth/                 # login, register, verification, guest guard
    dashboard/            # header, sidebar, layout (used)
    profile/              # complete-profile wizard chrome
    shared/               # buttons, inputs, pagination, phone, etc.
    ui/                   # feature cards, invoice document, dialogs
  lib/supabase/           # clients, middleware, auth/profile actions, guards
  lib/                    # hospitalShifts, shiftApplicants, invoice PDF helpers
  redux/                  # store, auth slice, AuthListener
  schemas/                # Zod schemas
  constants/              # mock datasets and option lists
  types/
supabase/migrations/      # SQL to apply in the Supabase dashboard
```

### Routes

| Path | Purpose | Data |
| --- | --- | --- |
| `/`, `/login` | Login | Supabase |
| `/register` | Doctor or hospital sign-up | Supabase |
| `/forgot-password`, `/reset-password` | Recovery | Supabase |
| `/verify-email`, `/verify-email-success` | Email confirmation UX | Supabase |
| `/auth/callback` | Code / OTP exchange | Supabase |
| `/doctor-profile`, `/hospital-profile` | Onboarding (gated) | Marks profile complete only |
| `/dashboard/doctor` | Doctor home | Mock |
| `/dashboard/doctor/browse-shifts` | Search UI | Mock (filters log only) |
| `/dashboard/doctor/my-applications` | Track / withdraw | Mock (withdraw is local state) |
| `/dashboard/doctor/my-shifts` | Upcoming shifts | Mock |
| `/dashboard/doctor/create-timesheet` | Hours form | Mock + `console.log` save |
| `/dashboard/doctor/my-timesheets` | Timesheet list | Mock |
| `/dashboard/doctor/my-invoices`, `/.../[id]` | Invoice list / PDF | Mock |
| `/dashboard/doctor/profile` | Edit profile UI | Hard-coded defaults, no API |
| `/dashboard/hospital` | Hospital home | Mock |
| `/dashboard/hospital/create-shift` | Create / edit | `localStorage` |
| `/dashboard/hospital/create-shift/payment-*` | Simulated payment | `localStorage` status |
| `/dashboard/hospital/my-shifts`, `/.../[id]` | List / applicants | `localStorage` + mock applicants |
| `/dashboard/hospital/profile` | Edit org profile UI | Same pattern as doctor edit |

Most pages are client components. Server work is concentrated in middleware, the auth callback route, server actions, and the documents GET handler. A class `ErrorBoundary` wraps the root tree.

## Setup

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project with Auth email enabled
- npm (lockfile: `package-lock.json`) or pnpm

### 1. Install

```bash
npm install
```

### 2. Environment variables

`.env*` files are gitignored. There is no committed `.env.example`. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser and server Supabase clients (required; throws if missing) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same (required) |
| `NEXT_PUBLIC_SITE_URL` | Public origin for auth email redirects; in production also a fallback when the request host is unavailable |

In Supabase, set **Authentication → URL configuration** so the site URL and redirect allow-list include your local origin and `/auth/callback`.

For Cloudflare, set the same `NEXT_PUBLIC_*` values as Worker secrets/vars (see comments in `wrangler.jsonc`). Do not commit keys.

### 3. Database

In the Supabase SQL editor, run the files in `supabase/migrations/` in order (`001` … `004`). The running app depends on `doctor_profiles` and `hospital_profiles` (and `profile_completed_at`).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

### Cloudflare (optional)

```bash
npm run build:cf      # OpenNext build
npm run preview:cf    # build + preview
npm run deploy:cf     # build + deploy
```



## Key engineering learnings

- Cookie-based Supabase SSR and Edge middleware must agree on session refresh and redirects, or users bounce between login and dashboard.
- Email magic links break if the redirect origin is baked as `localhost` in a production build; resolving origin from the live host (and forwarded headers) fixed that class of bugs.
- Duplicate sign-up detection via empty `identities` is more reliable than treating every Auth error as a new failure.
- Role-based products need both **server** gates (middleware) and **client** session state (Redux) so layouts and logout stay consistent.
- A complete UI can be built against mocks, but the cutover cost is high unless forms write the same shapes you will store later — onboarding today discards most of the data the user entered.

## Current limitations and next steps

**Limitations**

- No `shifts`, `applications`, `timesheets`, or `invoices` tables; doctor browse/apply/timesheet/invoice flows do not persist
- Hospital shifts are device-local `localStorage`, not shared with doctors
- Applicant accept/reject is React state only
- Browse-shift filters do not apply to the list
- Profile documents are not uploaded; completion is a flag
- Payment is simulated
- No automated tests
- Unused scaffold (RTK Query placeholder, some shadcn/table components)

**Useful next work**

- Model shifts, applications, timesheets, and invoices in Postgres with RLS by role
- Store credentials and documents in Supabase Storage
- Persist onboarding fields into the profile tables
- Replace simulated payment with a real provider
- Wire browse/apply so hospital and doctor views share one source of truth
- Add tests around middleware, route guards, and auth actions

## Author

**Ahmad Abdul Rehman** — frontend / software engineer  

- GitHub: [ahmadabdul786](https://github.com/ahmadabdul786)
- Repository: [CareRoster](https://github.com/ahmadabdul786/CareRoster)
