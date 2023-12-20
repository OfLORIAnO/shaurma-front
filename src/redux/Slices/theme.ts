import { createSlice } from '@reduxjs/toolkit';
import { getTheme, setThemeToLocalStorage } from '../../utils/localStorage';
import { RootState } from '../store';

export type ThemeType = 'light' | 'dark';

export interface themeState {
    theme: ThemeType;
}

const initialState: themeState = {
    theme: getTheme(),
};
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            } else {
                state.theme = 'dark';
            }
            setThemeToLocalStorage(state.theme);
        },
    },
});
export const selectTheme = (state: RootState) => state.theme.theme;
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
