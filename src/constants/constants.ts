import type { FolderColor } from '../types';

// FolderColor[] tells TypeScript every item must be a valid colour string.
// If you add a typo like 'reed', TypeScript will flag it immediately.
export const FOLDER_COLOR_OPTIONS: FolderColor[] = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
];

export const FOLDER_NAME_MAX_LENGTH: number = 24;
