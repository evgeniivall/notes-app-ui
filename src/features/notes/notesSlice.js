import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    createNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        title: action.payload.title,
        folderId: action.payload.folderId || '0',
        tagIds: action.payload.tagIds || [],
        isStarred: action.payload.isStarred || false,
        lastUpdatedDate: action.payload.lastUpdatedDate || Date.now(),
      };
      state.notes.push(newNote);
      saveDataToLocalStorage('notes', state.notes);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      saveDataToLocalStorage('notes', state.notes);
    },
    updateNote: (state, action) => {
      const { id, updates } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        Object.assign(existingNote, updates);
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

export const selectNotes = (state) => state.notes.notes;
export const selectNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note.id === noteId);

export const { createNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
