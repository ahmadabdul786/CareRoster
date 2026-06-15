const STORAGE_KEY = 'pendingRegistrationEmail';
const LEGACY_STORAGE_KEY = 'pendingLoginCredentials';

export function savePendingRegistrationEmail(email: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(LEGACY_STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, email.trim().toLowerCase());
}

export function getPendingRegistrationEmail(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return stored;
  }

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);

  if (!legacy) {
    return null;
  }

  try {
    const parsed = JSON.parse(legacy) as { email?: string };

    if (typeof parsed.email === 'string' && parsed.email) {
      return parsed.email.trim().toLowerCase();
    }
  } catch {
    // Ignore malformed legacy values.
  }

  return null;
}

export function clearPendingRegistrationEmail() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}
