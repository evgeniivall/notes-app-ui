import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tags: [
    { id: uuidv4(), name: 'Work' },
    { id: uuidv4(), name: 'Personal' },
    { id: uuidv4(), name: 'Creative Ideas' },
    { id: uuidv4(), name: 'Health' },
    { id: uuidv4(), name: 'Recipes' },
    { id: uuidv4(), name: 'Research & Study' },
    { id: uuidv4(), name: 'Personal Development' },
  ],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
});

export default tagsSlice.reducer;
