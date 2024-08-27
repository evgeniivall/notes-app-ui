import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { deleteFolder, updateFolderCounter } from '../folders/foldersSlice';
import {
  loadFromLocalStorage,
  saveDataToLocalStorage,
} from '../../utils/helpers';

const initialState = {
  notes: loadFromLocalStorage('notes'),
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: {
      reducer: (state, action) => {
        state.notes.push(action.payload);
        saveDataToLocalStorage('notes', state.notes);
      },
      prepare: (noteData) => {
        const newNote = {
          id: uuidv4(),
          title: noteData.title,
          folderId: noteData.folderId || '0',
          tags: noteData.tags || [],
          isStarred: noteData.isStarred || false,
          lastUpdatedDate: noteData.lastUpdatedDate || Date.now(),
          body: noteData.body,
        };
        return { payload: newNote };
      },
    },
    _deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      saveDataToLocalStorage('notes', state.notes);
    },
    updateNote: (state, action) => {
      const { id, updates } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        Object.assign(existingNote, {
          ...updates,
          lastUpdatedDate: Date.now(),
        });
        saveDataToLocalStorage('notes', state.notes);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteFolder, (state, action) => {
      const folderIdToDelete = action.payload.id;
      state.notes = state.notes.map((note) => {
        if (note.folderId === folderIdToDelete) {
          return {
            ...note,
            folderId: '0',
          };
        }
        return note;
      });
    });
  },
});

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ id, type = 'hard' }, { dispatch, getState }) => {
    const oldNote = getState().notes.notes.find((note) => note.id === id);
    const oldFolderId = oldNote.folderId || '0';
    if (type === 'hard') dispatch(notesSlice.actions._deleteNote({ id }));
    else if (type === 'soft') {
      dispatch(
        notesSlice.actions.updateNote({ id, updates: { isDeleted: true } }),
      );
    }
    /* If isDeleter is true, that means that folder counter was already updated during previous soft delete */
    if (!oldNote.isDeleted)
      dispatch(updateFolderCounter({ folderId: oldFolderId, change: -1 }));
  },
);

export const updateNoteFolder = createAsyncThunk(
  'notes/updateNoteFolder',
  async ({ id, folderId }, { dispatch, getState }) => {
    const oldNote = getState().notes.notes.find((note) => note.id === id);
    const oldFolderId = oldNote.folderId;
    dispatch(updateNote({ id, updates: { folderId } }));

    if (oldFolderId !== folderId) {
      dispatch(updateFolderCounter({ folderId: oldFolderId, change: -1 }));
      dispatch(updateFolderCounter({ folderId, change: 1 }));
    }
  },
);

export const selectNotes = createSelector(
  (state) => state.notes.notes,
  (notes) => notes.filter((note) => !note.isDeleted),
);
export const selectDeletedNotes = createSelector(
  (state) => state.notes.notes,
  (notes) => notes.filter((note) => note.isDeleted),
);
export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note.id === noteId);

export const { createNote, updateNote, _deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
