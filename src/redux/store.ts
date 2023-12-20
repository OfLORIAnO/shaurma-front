import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './Slices/theme';
import userReducer from './Slices/user';
import postsReducer from './Slices/posts';
import postReducer from './Slices/post';
import profileReducer from './Slices/profile';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        posts: postsReducer,
        post: postReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
