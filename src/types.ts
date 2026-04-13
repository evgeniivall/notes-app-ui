import type React from 'react';

export type FolderColor =
  | 'red'
  | 'magenta'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'grey';

export interface Folder {
  id: string;
  name: string;
  color: FolderColor;
  notesCnt: number;
  isSystem?: boolean;
}

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

export interface Tag {
  name: string;
  notes: string[];              // IDs of notes that use this tag
  width?: number;               // pixel width — calculated lazily for rendering
  style?: 'solid' | 'wired';
  icon?: React.ReactNode;
}
