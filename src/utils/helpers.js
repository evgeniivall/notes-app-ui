export const getCSSVariable = (name) => `var(--${name})`;

export function normalizeWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ');
}

export function formatDateToDayMonth(date) {
  const options = { day: 'numeric', month: 'short' };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function loadFromLocalStorage(name, fallback = []) {
  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : fallback;
}

export function saveDataToLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

const SM_BREAKPOINT = 768;
export const isMobileDevice = () => window.innerWidth < SM_BREAKPOINT;
