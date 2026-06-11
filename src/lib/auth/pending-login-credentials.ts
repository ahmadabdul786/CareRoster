const STORAGE_KEY = 'pendingLoginCredentials';

export interface PendingLoginCredentials {
  email: string;
  password: string;
}

export function savePendingLoginCredentials(
  credentials: PendingLoginCredentials,
) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
}

export function getPendingLoginCredentials(): PendingLoginCredentials | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as PendingLoginCredentials;

    if (
      typeof parsed.email !== 'string' ||
      typeof parsed.password !== 'string' ||
      !parsed.email ||
      !parsed.password
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingLoginCredentials() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}
