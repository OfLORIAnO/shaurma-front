import React, {FC, useState} from 'react';

import s from './Header.module.scss';

import classNames from 'classnames';
import {Link, useAsyncError} from 'react-router-dom';

import {selectTheme} from '../../redux/Slices/theme';

import {Container} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import {Button} from '../Button/Button';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {logout, selectIsAuthed, selectUser} from '../../redux/Slices/user';

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  const userId = useAppSelector(selectUser)?._id;

  const isAuthed = useAppSelector(selectIsAuthed);

  const onClickOnLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <header className={classNames({[s.header]: true, [s.dark]: theme === 'dark'})}>
      <Container>
        <div className={s.content}>
          <Link
            to='/'
            className={classNames(s.logo, {
              [s.dark__text]: theme === 'dark',
            })}
          >
            <img src='/logoShaverma.png' alt='Logo' />
            ШавермНьюс
          </Link>
          <div className={s.panel}>
            {isAuthed ? (
              <>
                <Link to='/'>
                  <Button func={() => onClickOnLogout()} color={'default'}>
                    Выйти
                  </Button>
                </Link>
                <Link to={`/profile/${userId}`}>
                  <Button color={'primary'}>
                    <PersonIcon />
                    Профиль
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to='/register'>
                  <Button
                    // func={() => setIsAuth(true)}
                    color={'default'}
                  >
                    Зарегистрироваться
                  </Button>
                </Link>
                <Link to='/login'>
                  <Button
                    // func={() => setIsAuth(true)}
                    color={'primary'}
                  >
                    Войти
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
