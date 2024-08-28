export const getCSSVariable = (name) => `var(--${name})`;

export function normalizeWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ');
}

export function formatDateToDayMonth(date) {
  const options = { day: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function loadFromLocalStorage(
  name,
  fallback = [],
  expectedVersion = '1.0',
) {
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
    return JSON.parse(storedData);
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

export function saveDataToLocalStorage(name, data, version = '1.0') {
  localStorage.setItem(name, JSON.stringify(data));
  localStorage.setItem('version', version);
}

const SM_BREAKPOINT = 768;
export const isMobileDevice = () => window.innerWidth < SM_BREAKPOINT;
