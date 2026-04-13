import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './features/folders/foldersSlice';
import tagsReducer from './features/tags/tagsSlice';
import notesReducer from './features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    tags: tagsReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
