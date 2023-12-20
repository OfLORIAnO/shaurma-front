import React, { FC } from 'react';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { Button } from '../../components/Button/Button';
import s from './Login.module.scss';
import { LoginFormValues } from './types';
import { loginAuth, selectIsAuthed, selectUserStatus } from '../../redux/Slices/user';
import { Navigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
export const Login: FC = () => {
    const disptach = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormValues>({
        mode: 'onChange',
    });
    const loadingStatus = useAppSelector(selectUserStatus);
    const onSubmit = async (values: LoginFormValues) => {
        const data: any = await disptach(loginAuth(values));
        if (!data.payload) {
            return alert('Не удалось авторизироваться');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };
    const theme = useAppSelector(selectTheme);

    const isAuthed = useAppSelector(selectIsAuthed);
    if (isAuthed) {
        return <Navigate to='/' />;
    }
    return (
        <div className={s.login}>
            <form
                className={classNames(s.form, {
                    [s.dark]: theme === 'dark',
                })}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography mb='5px' color='secondary' variant='h4'>
                    Войти
                </Typography>
                <TextField
                    {...register('email', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                    })}
                    helperText={errors.email?.message}
                    error={Boolean(errors.email?.message)}
                    margin={'dense'}
                    fullWidth
                    label='E-mail'
                    type='email'
                    autoComplete='email'
                />
                <TextField
                    {...register('password', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                    })}
                    helperText={errors.password?.message}
                    error={Boolean(errors.password?.message)}
                    label='Пароль'
                    type='password'
                    margin={'dense'}
                    fullWidth
                    autoComplete='current-password'
                />
                <Button
                    color='primary'
                    disabled={!isValid || loadingStatus === 'loading'}
                    type='submit'
                >
                    {loadingStatus === 'loading' ? <Loading color={'#fff'} /> : 'Войти'}
                </Button>
            </form>
        </div>
    );
};
