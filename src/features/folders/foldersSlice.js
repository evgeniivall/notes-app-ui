import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const loadFoldersFromLocalStorage = () => {
  const folders = localStorage.getItem('folders');
  return folders ? JSON.parse(folders) : [];
};

const saveFoldersToLocalStorage = (folders) => {
  const foldersToSave = folders.filter((folder) => !folder.isSystem);
  localStorage.setItem('folders', JSON.stringify(foldersToSave));
};

const initialState = {
  folders: [
    ...loadFoldersFromLocalStorage(),
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
      const { folderId, updates } = action.payload;
      const folder = state.folders.find((folder) => folder.id === folderId);
      if (folder) {
        Object.assign(folder, updates);
        saveFoldersToLocalStorage(state.folders);
      }
    },
    deleteFolder(state, action) {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload,
      );
      saveFoldersToLocalStorage(state.folders);
    },
  },
});

export const { createFolder, updateFolder, deleteFolder, validateFolderName } =
  foldersSlice.actions;

export default foldersSlice.reducer;
