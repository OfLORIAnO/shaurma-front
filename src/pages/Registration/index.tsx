import React, { FC } from 'react';

import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RegistrationFormValues } from './types';

import s from './Registration.module.scss';

import TextField from '@mui/material/TextField';
import { Button } from '../../components/Button/Button';
import { registerAuth, selectIsAuthed, selectUserStatus } from '../../redux/Slices/user';
import { Navigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
export const Registration: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegistrationFormValues>({ mode: 'onChange' });
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const loadingStatus = useAppSelector(selectUserStatus);
    const onSubmit = async (values: RegistrationFormValues) => {
        const data: any = await dispatch(registerAuth(values));
        if (!data.payload) {
            return alert('Не удалось авторизироваться');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    const isAuthed = useAppSelector(selectIsAuthed);

    if (isAuthed) {
        return <Navigate to='/' />;
    }

    return (
        <div className={s.register}>
            <form
                className={classNames(s.form, {
                    [s.dark]: theme === 'dark',
                })}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography mb='5px' color='secondary' variant='h4'>
                    Зарегистрироваться
                </Typography>
                <TextField
                    {...register('fullName', {
                        required: 'Это обязательное поле',
                        minLength: {
                            value: 8,
                            message: 'Минимальная длина должна быть 8',
                        },
                        maxLength: {
                            value: 30,
                            message: 'Максимальная длина должна быть 30',
                        },
                    })}
                    helperText={errors.fullName?.message}
                    error={Boolean(errors.fullName?.message)}
                    label='ФИО'
                    fullWidth
                    margin={'dense'}
                    autoComplete='name'
                />
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
                    label='E-mail'
                    type='email'
                    fullWidth
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
                    autoComplete='new-password'
                    margin={'dense'}
                    fullWidth
                />
                <Button
                    color='primary'
                    disabled={!isValid || loadingStatus === 'loading'}
                    type='submit'
                >
                    {loadingStatus === 'loading' ? (
                        <Loading color={'#fff'} />
                    ) : (
                        'Зарегистрироваться'
                    )}
                </Button>
            </form>
        </div>
    );
};
