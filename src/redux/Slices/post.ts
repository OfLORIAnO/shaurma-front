import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IPost } from './types';
import { RootState } from '../store';
import axios from '../../axios';

export interface postState {
    post: IPost | null;
    status: 'loading' | 'error' | 'loaded';
}

export const fetchPost = createAsyncThunk('/posts/:id', async (id: string) => {
    const { data }: { data: IPost } = await axios.get(`/post/${id}`);
    return data;
});

const initialState: postState = {
    post: null,
    status: 'loaded',
};
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.status = 'loading';
            state.post = null;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.post = action.payload;
            state.status = 'loaded';
        });
        builder.addCase(fetchPost.rejected, (state) => {
            state.status = 'error';
            state.post = null;
        });
    },
});

export const selectPost = (state: RootState) => state.post.post;
export const selectStatusPost = (state: RootState) => state.post.status;

export default postSlice.reducer;
