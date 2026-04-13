import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getTagStyles } from './tagWidthCalcHelpers';
import { loadFromLocalStorage, saveDataToLocalStorage } from '../../utils/helpers';
import { _deleteNote, createNote, updateNote } from '../notes/notesSlice';
import { Tag } from '../../types';
import type { RootState } from '../../store';

interface TagsState {
  tags: Tag[];
}

interface StoredTag {
  name: string;
  notes: string[];
}

export const fetchTagStyles = createAsyncThunk<{ tagName: string; width: number }, string>(
  'tags/fetchTagStyles',
  async (tagName) => {
    const { width } = await getTagStyles(tagName);
    return { tagName, width };
  },
);

const initialState: TagsState = {
  tags: loadFromLocalStorage<StoredTag[]>('tags', []),
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    createTag: {
      reducer: (state, action: PayloadAction<StoredTag>) => {
        state.tags.push(action.payload);
        saveDataToLocalStorage('tags', state.tags);
      },
      prepare: ({ name }: { name: string }) => {
        return { payload: { name, notes: [] as string[] } };
      },
    },
    deleteTag: (state, action: PayloadAction<{ name: string }>) => {
      state.tags = state.tags.filter((tag) => tag.name !== action.payload.name);
      saveDataToLocalStorage('tags', state.tags);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagStyles.fulfilled, (state, action) => {
        const { tagName, width } = action.payload;
        const tag = state.tags.find((tag) => tag.name === tagName);
        if (tag) {
          tag.width = width;
        }
      })
      .addCase(createNote, (state, action) => {
        const { id, tags } = action.payload;

        tags.forEach((tag) => {
          const existingTag = state.tags.find((t) => t.name === tag);

          if (existingTag) {
            if (!existingTag.notes?.includes(id)) {
              existingTag.notes = [...(existingTag.notes || []), id];
            }
          } else {
            state.tags.push({ name: tag, notes: [id] });
          }
        });
        saveDataToLocalStorage('tags', state.tags);
      })
      .addCase(updateNote, (state, action) => {
        const existingTags = state.tags;
        const {
          id,
          updates: { tags: noteTags },
        } = action.payload;
        if (!noteTags) return;

        // Remove the note from tags that are no longer associated with it
        existingTags.forEach((tag) => {
          if (tag.notes?.includes(id) && !noteTags.includes(tag.name)) {
            tag.notes = tag.notes.filter((noteId) => noteId !== id);
          }
        });

        // Remove tags that have no more notes associated
        state.tags = state.tags.filter((tag) => tag.notes?.length > 0);

        // Add note to the new tags, or create them if they don't exist
        noteTags.forEach((newTag) => {
          const existingTag = state.tags.find((tag) => tag.name === newTag);

          if (existingTag) {
            if (!existingTag.notes?.includes(id)) {
              existingTag.notes = [...(existingTag.notes || []), id];
            }
          } else {
            state.tags.push({ name: newTag, notes: [id] });
          }
        });
        saveDataToLocalStorage('tags', state.tags);
      })
      .addCase(_deleteNote, (state, action) => {
        const noteId = action.payload.id;

        // Remove the note association from all tags
        state.tags = state.tags.map((tag) => ({
          ...tag,
          notes: tag.notes.filter((id) => id !== noteId),
        }));

        // Remove tags that have no more notes associated
        state.tags = state.tags.filter((tag) => tag.notes.length > 0);
        saveDataToLocalStorage('tags', state.tags);
      });
  },
});

export const selectTags = (state: RootState) => state.tags.tags;
export const selectTagByName = (state: RootState, tagName: string) =>
  state.tags.tags.find((tag) => tag.name === tagName);
export const selectTagsByNames = createSelector(
  (state: RootState) => state.tags.tags,
  (_: RootState, tagNames: string[]) => tagNames,
  (tags, tagNames) =>
    tagNames
      .map((name) => tags.find((tag) => tag.name === name))
      .filter((tag): tag is Tag => tag !== undefined),
);

export const { deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
