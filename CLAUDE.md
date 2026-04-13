# Notes App UI — Claude Code Guide

## Project Overview

React SPA for note-taking with folder/tag organization. Client-side only (no backend yet). All data persists to browser localStorage.

**Stack:** React 18, Redux Toolkit, React Router v6, Vite, CSS Modules

---

## Development Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run prod      # Build + preview combined
npm run lint      # ESLint (zero warnings policy — must pass clean)
```

**Docker:**
```bash
docker build -t notes-app .
docker run -p 8080:80 notes-app
```

---

## Project Structure

```
src/
├── features/          # Feature modules (domain-driven)
│   ├── notes/         # notesSlice.js + note components
│   ├── folders/       # foldersSlice.js + folder components
│   └── tags/          # tagsSlice.js + tag components
├── pages/             # Page/layout components + sidebar/
├── ui/                # Reusable UI components (Button, Input, Search, …)
├── icons/             # SVG icons (imported as React components via vite-plugin-svgr)
├── utils/             # localStorage helpers, date formatting, CSS variable helpers
├── constants/         # App-wide constants
├── tests/             # Test data generators (no test framework)
├── App.jsx            # Root component with router setup
├── store.js           # Redux store configuration
└── index.css          # Global styles
```

---

## Architecture

### State Management (Redux Toolkit)

Three slices in `src/features/*/`:

| Slice | File | Key Actions |
|-------|------|-------------|
| notes | `notesSlice.js` | `createNote`, `updateNote`, `deleteNote` (thunk, soft/hard), `updateNoteFolder` (thunk) |
| folders | `foldersSlice.js` | `createFolder`, `updateFolder`, `deleteFolder`, `updateFolderCounter` |
| tags | `tagsSlice.js` | `createTag`, `deleteTag`, `fetchTagStyles` (thunk) |

**Conventions:**
- Selectors use `select` prefix: `selectNotes`, `selectFolderById`, `selectTagsByNames`
- Internal/private actions use `_` prefix: `_deleteNote`
- Cross-slice side effects handled via `extraReducers` (e.g., deleting a folder cascades to notes)
- All state auto-persisted to localStorage on every change via reducer side effects

### Routing (React Router v6)

```
/ (MainLayout)
├── / → redirect to /notes
├── /notes
├── /notes/:noteId
└── /testData   (dev only — populates store with test data)
```

### Data Persistence

- `loadFromLocalStorage` / `saveDataToLocalStorage` in `src/utils/`
- Version `"1.0"` stored in localStorage; mismatch clears all data
- No backend API — all data is local

---

## Styling

- **CSS Modules** only — files named `*.module.css`
- Vite configured with `localsConvention: 'camelCaseOnly'` → class names accessed as camelCase
- Dark mode supported via CSS variables
- Mobile breakpoint: `768px` (checked via `isMobileDevice` helper)
- No CSS-in-JS, no Tailwind

---

## Key Conventions

### Files & Naming
- React components: `PascalCase.jsx` + colocated `PascalCase.module.css`
- Utilities/slices: `camelCase.js`
- Feature components live alongside their slice in `src/features/<domain>/`

### Component Patterns
- Functional components + hooks only
- `useSelector` / `useDispatch` for Redux
- Custom hooks in feature folders (e.g., `useTagsProcessing.js`)
- Reusable primitives live in `src/ui/`, not in feature folders

### Data Modeling
- IDs: UUID via `uuid` package
- Notes have: `id`, `title`, `content`, `folderId`, `tags[]`, `isDeleted`, `isStarred`, `lastUpdatedDate`, `createdDate`
- Folders have: `id`, `name`, `color`, `notesCount`. System folder id is `'0'` ("Unorganized")
- Tags track which note IDs they belong to for cleanup (auto-delete tag with zero notes)
- Soft delete: `isDeleted: true` flag moves note to archive view

### Note Grouping
Notes are grouped chronologically: Today / This Week / This Month / This Year / Older (logic in `src/features/notes/notesGrouping.js`)

---

## Linting & Formatting

**ESLint** (`.eslintrc.cjs`):
- Extends `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`
- `react/prop-types` disabled
- Zero warnings — `npm run lint` must exit clean before committing

**Prettier** (`.prettierrc.json`):
- 2-space indent, single quotes

---

## What Does Not Exist (Yet)

- No backend/API layer — all CRUD is local
- No test framework (no Jest/Vitest/RTL) — `src/tests/` only generates seed data
- No environment variables / `.env` files
- No TypeScript
- No error monitoring / logging
