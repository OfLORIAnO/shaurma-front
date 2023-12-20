import React, {FC} from 'react';

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';

import {
  lightTheme,
  darkTheme,
  typographyTheme,
  changeLightTheme,
  changeDarkTheme,
} from './themeCustom';
import {selectTheme} from './redux/Slices/theme';
import {Route, Routes} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './redux/hooks';

import {Header} from './components/Header/Header';
import {Home} from './pages/Home/Home';
import {Profile} from './pages/Profile';
import {Login} from './pages/Login';
import {Registration} from './pages/Registration';

import s from './App.module.scss';
import './reset.css';
import PostFullScreen from './pages/PostFullScreen/PostFullScreen';
import {fetchAuthMe} from './redux/Slices/user';
import AddArticle from './pages/AddArticle/AddArticle';

export const App: FC = () => {
  React.useEffect(() => {
    console.log('render');
  });
  const themeMode = useAppSelector(selectTheme);

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === 'light' ? lightTheme : darkTheme),
        },
        typography: typographyTheme,
      }),
    [themeMode]
  );
  theme = React.useMemo(
    () =>
      createTheme(theme, {
        palette: {
          ...(themeMode === 'light'
            ? {
                changeLightTheme,
                text: {
                  primary: '#6941c6',
                  secondary: '#101828',
                  text: {
                    gray: theme.palette.augmentColor({
                      color: {
                        main: '#475467',
                      },
                      name: 'gray',
                    }),
                  },
                },
              }
            : {
                changeDarkTheme,
                text: {
                  primary: '#7f56d9',
                  secondary: 'rgba(255, 255, 255, 0.7)',
                  text: {
                    gray: theme.palette.augmentColor({
                      color: {
                        main: '#475467',
                      },
                      name: 'gray',
                    }),
                  },
                },
              }),
        },
      }),
    [themeMode]
  );
  theme = responsiveFontSizes(theme);
  const dispatch = useAppDispatch();

  const wasRender = React.useRef(false);
  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token && !wasRender.current) {
      dispatch(fetchAuthMe(token));
    }
    wasRender.current = true;
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={s.container}>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/post/:id/edit' element={<AddArticle />} />
            <Route path='/post/:id' element={<PostFullScreen />} />
            <Route path='/addArticle' element={<AddArticle />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
};
