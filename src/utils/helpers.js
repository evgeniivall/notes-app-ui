export const getCSSVariable = (name) => `var(--${name})`;

export function normalizeWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ');
}
