import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './features/folders/foldersSlice';
export const store = configureStore({
  reducer: {
    folders: foldersReducer,
  },
});

export default store;
