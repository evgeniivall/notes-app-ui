export const getCSSVariable = (name: string): string => `var(--${name})`;

export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

export function formatDateToDayMonth(date: number | Date | string): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function loadFromLocalStorage<T>(
  name: string,
  fallback: T = [] as unknown as T,
  expectedVersion: string = '1.0',
): T {
  const storedVersion = localStorage.getItem('version');

  // If version doesn't match or is missing, return fallback and clear local storage
  if (!storedVersion || storedVersion !== expectedVersion) {
    console.warn(
      `Outdated or missing version detected. Clearing localStorage...`,
    );
    localStorage.removeItem(name);
    localStorage.removeItem('version');
    return fallback;
  }

  const storedData = localStorage.getItem(name);

  if (!storedData) {
    return fallback;
  }

  try {
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.error(
      `Error parsing localStorage data for key: ${name}. Clearing localStorage...`,
      error,
    );
    localStorage.removeItem(name);
    localStorage.removeItem('version');
    return fallback;
  }
}

// unknown is safer than any — it forces callers to be explicit about
// what they're saving, rather than silently accepting anything.
export function saveDataToLocalStorage(
  name: string,
  data: unknown,
  version: string = '1.0',
): void {
  localStorage.setItem(name, JSON.stringify(data));
  localStorage.setItem('version', version);
}

const SM_BREAKPOINT = 768;
export const isMobileDevice = (): boolean => window.innerWidth < SM_BREAKPOINT;
