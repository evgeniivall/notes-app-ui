import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadFromLocalStorage, saveDataToLocalStorage } from '../../utils/helpers';
import { Folder, FolderColor } from '../../types';
import { createNote } from '../notes/notesSlice';

interface FoldersState {
  folders: Folder[];
}

interface CreateFolderInput {
  name: string;
  color: FolderColor;
}

interface UpdateFolderPayload {
  id: string;
  updates: Partial<Folder>;
}

interface UpdateFolderCounterPayload {
  folderId: string;
  change: number;
}

const saveFoldersToLocalStorage = (folders: Folder[]) => {
  const foldersToSave = folders.filter((folder) => !folder.isSystem);
  saveDataToLocalStorage('folders', foldersToSave);
};

const initialState: FoldersState = {
  folders: [
    ...loadFromLocalStorage<Folder[]>('folders', []),
    {
      id: '0',
      color: 'grey',
      name: 'Unorganized',
      isSystem: true,
      notesCnt: 0,
    },
  ],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    createFolder: {
      reducer: (state, action: PayloadAction<Folder>) => {
        state.folders.unshift(action.payload);
        saveFoldersToLocalStorage(state.folders);
      },
      prepare: (folderData: CreateFolderInput) => {
        const newFolder: Folder = {
          id: uuidv4(),
          name: folderData.name,
          color: folderData.color,
          notesCnt: 0,
        };
        return { payload: newFolder };
      },
    },
    updateFolder(state, action: PayloadAction<UpdateFolderPayload>) {
      const { id, updates } = action.payload;
      const folder = state.folders.find((folder) => folder.id === id);
      if (folder) {
        Object.assign(folder, updates);
        saveFoldersToLocalStorage(state.folders);
      }
    },
    deleteFolder(state, action: PayloadAction<{ id: string }>) {
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload.id || folder.isSystem,
      );
      saveFoldersToLocalStorage(state.folders);
    },
    updateFolderCounter: (state, action: PayloadAction<UpdateFolderCounterPayload>) => {
      const { folderId, change } = action.payload;
      const folder = state.folders.find((folder) => folder.id === folderId);
      if (folder) {
        folder.notesCnt += change;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNote, (state, action) => {
      const folderId = action.payload.folderId || '0';
      const folder = state.folders.find((folder) => folder.id === folderId);
      if (folder) {
        folder.notesCnt += 1;
        saveFoldersToLocalStorage(state.folders);
      }
    });
  },
  /* TODO handle deleteNote and updateNote */
});

export const selectFolders = (state: { folders: FoldersState }) => state.folders.folders;
export const selectFolderById = (state: { folders: FoldersState }, folderId: string) =>
  state.folders.folders.find((folder) => folder.id === folderId);

export const {
  createFolder,
  updateFolder,
  deleteFolder,
  updateFolderCounter,
} = foldersSlice.actions;

export default foldersSlice.reducer;
