import type React from 'react';

// ─── Folder ──────────────────────────────────────────────────────────────────

// A union type means the value must be exactly one of these strings.
// TypeScript will warn you if you use a colour that isn't in this list.
export type FolderColor =
  | 'red'
  | 'magenta'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'grey';

// An interface describes the shape of an object — what fields it has and what
// type each field holds.
export interface Folder {
  id: string;
  name: string;
  color: FolderColor;
  notesCnt: number;
}

// ─── Note ────────────────────────────────────────────────────────────────────

export interface Note {
  id: string;
  title: string;
  body: string;
  folderId: string;        // '0' means the system "Unorganized" folder
  tags: string[];          // array of tag names
  isStarred: boolean;
  lastUpdatedDate: number; // Unix timestamp (milliseconds)
  isDeleted?: boolean;     // optional — only set to true on soft-delete
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

export interface Tag {
  name: string;
  notes: string[];              // IDs of notes that use this tag
  width?: number;               // pixel width — calculated lazily for rendering
  style?: 'solid' | 'wired';
  icon?: React.ReactNode;
}
