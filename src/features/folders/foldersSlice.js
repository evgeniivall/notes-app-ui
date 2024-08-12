import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  loadFromLocalStorage,
  saveDataToLocalStorage,
} from '../../utils/helpers';
};

const saveFoldersToLocalStorage = (folders) => {
  const foldersToSave = folders.filter((folder) => !folder.isSystem);
  saveDataToLocalStorage('folders', foldersToSave);
};

const initialState = {
  folders: [
    ...loadFromLocalStorage('folders'),
    {
      id: '0',
      color: 'grey',
      name: 'Unorganized',
      isSystem: true,
      notesCnt: 25,
    },
  ],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    createFolder(state, action) {
      const newFolder = {
        id: uuidv4(),
        name: action.payload.name,
        color: action.payload.color,
        notesCnt: 0,
      };
      state.folders.unshift(newFolder);
      saveFoldersToLocalStorage(state.folders);
    },
    updateFolder(state, action) {
      const { id, updates } = action.payload;
      const folder = state.folders.find((folder) => folder.id === id);
      if (folder) {
        Object.assign(folder, updates);
        saveFoldersToLocalStorage(state.folders);
      }
    },
    deleteFolder(state, action) {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload.id || folder.isSystem,
      );
      saveFoldersToLocalStorage(state.folders);
    },
  },
export const selectFolders = (state) => state.folders.folders;
export const selectFolderById = (state, folderId) =>
  state.folders.folders.find((folder) => folder.id === folderId);

export const { createFolder, updateFolder, deleteFolder, validateFolderName } =
  foldersSlice.actions;

export default foldersSlice.reducer;
