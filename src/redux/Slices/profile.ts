import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

import {
    IEditPost,
    IGetProfilePosts,
    INewPost,
    IPost,
    IRes,
    IUser,
} from './types';
import { RootState } from '../store';

export const deletePostFetch = createAsyncThunk(
    '/posts/delete',
    async (postId: string) => {
        const { data } = await axios.delete(`/posts/${postId}`);
        return { data, postId };
    }
);

export const getPosts = createAsyncThunk(
    `/profile/`,
    async ({ userId, page = 1, limit = 4 }: IGetProfilePosts) => {
        console.log(page, limit);
        const { data }: { data: IRes } = await axios.get(
            `/profile/${userId}/?limit=${limit}&page=${page}`
        );
        return data;
    }
);

export const createArticleFetch = createAsyncThunk(
    '/posts/create',
    async (post: INewPost) => {
        const { data } = await axios.post('/posts', post);
        return data;
    }
);

export const updatePostFetch = createAsyncThunk(
    '/posts/update',
    async (post: IEditPost) => {
        const { data } = await axios.patch(`/posts/${post._id}`, post);
        return data;
    }
);


export interface profileState {
    user: IUser | null;
    posts: IPost[] | null;
    status: 'loading' | 'error' | 'loaded';
    statusDelete: 'loading' | 'error' | 'loaded';
}
const initialState: profileState = {
    user: null,
    posts: null,
    status: 'loaded',
    statusDelete: 'loaded',
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.posts = null;
            state.user = null;
            state.status = 'loading';
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.user = action.payload.user;
            state.status = 'loaded';
        });
        builder.addCase(getPosts.rejected, (state) => {
            state.posts = null;
            state.user = null;
            state.status = 'error';
        });
        builder.addCase(deletePostFetch.pending, (state) => {
            state.statusDelete = 'loading';
        });
        builder.addCase(deletePostFetch.fulfilled, (state, action) => {
            state.statusDelete = 'loaded';
            const deletedPostId = action.payload.postId;
            state.posts =
                state.posts !== null
                    ? state.posts.filter((item) => item._id !== deletedPostId)
                    : [];
        });
    },
});

export const selectProfilePosts = (state: RootState) => state.profile.posts;
export const selectStatusProfile = (state: RootState) => state.profile.status;
export const selectUserProfile = (state: RootState) => state.profile.user;
export const selectDeleteStatus = (state: RootState) => state.profile.statusDelete;

export default profileSlice.reducer;
