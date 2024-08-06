import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './features/folders/foldersSlice';
import tagsReducer from './features/tags/tagsSlice';

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    tags: tagsReducer,
  },
});

export default store;
