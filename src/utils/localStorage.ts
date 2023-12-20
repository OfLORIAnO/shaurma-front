import { ThemeType } from '../redux/Slices/theme';

export function getTheme(): ThemeType {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
        return theme;
    }
    return 'light';
}
export const setThemeToLocalStorage = (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
};