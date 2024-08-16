import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import { getTagStyles } from './tagWidthCalcHelpers';
import {
  loadFromLocalStorage,
  saveDataToLocalStorage,
} from '../../utils/helpers';

export const fetchTagStyles = createAsyncThunk(
  'tags/fetchTagStyles',
  async (tagName) => {
    const { width } = await getTagStyles(tagName);
    return { tagName, width };
  },
);

const initialState = {
  tags: loadFromLocalStorage('tags'),
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    createTag: (state, action) => {
      const newTag = { id: uuidv4(), name: action.payload.name };
      state.tags.push(newTag);
      saveDataToLocalStorage('tags', state.tags);
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
      saveDataToLocalStorage('tags', state.tags);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTagStyles.fulfilled, (state, action) => {
      const { tagName, width } = action.payload;
      const tag = state.tags.find((tag) => tag.name === tagName);
      if (tag) {
        tag.width = width;
      }
    });
  },
});

export const selectTags = (state) => state.tags.tags;
export const selectTagById = (state, tagId) =>
  state.tags.tags.find((tag) => tag.id === tagId);
export const selectTagsByIds = createSelector(
  (state) => state.tags.tags,
  (_, tagIds) => tagIds,
  (tags, tagIds) => tagIds.map((id) => tags.find((tag) => tag.id === id)),
);

export const { createTag, deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
