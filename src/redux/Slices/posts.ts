import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IPost } from './types';
import { RootState } from '../store';

import axios from '../../axios';

interface IPostRes extends IPost {
    length: number;
    posts: IPost[];
}

export interface postsState {
    posts: IPost[];
    status: 'loading' | 'error' | 'loaded';
}

export const fetchAllPosts = createAsyncThunk(
    '/posts',
    async ({ page = 1, limit = 6 }: { page?: number; limit?: number }) => {
        const { data }: { data: IPostRes } = await axios.get(
            `/posts/?page=${page}&limit=${limit}`
        );
        return data;
    }
);

const initialState: postsState = {
    posts: [],
    status: 'loaded',
};
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.status = 'loading';
            state.posts = [];
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.status = 'loaded';
        });
        builder.addCase(fetchAllPosts.rejected, (state) => {
            state.status = 'error';
            state.posts = [];
        });
    },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatusPosts = (state: RootState) => state.posts.status;

export const { setStatus } = postsSlice.actions;

export default postsSlice.reducer;
