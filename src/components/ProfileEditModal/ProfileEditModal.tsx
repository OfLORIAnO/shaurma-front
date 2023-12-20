import React, { FC, useEffect, useState } from 'react';
import { IProps } from './ProfileEditModal.props';

import { Modal, Box, TextField } from '@mui/material';

import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import s from './ProfileEditModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTheme } from '../../redux/Slices/theme';
import { Button } from '../Button/Button';
import { EditFormValues } from './ProfileEditModal.type';
import Loading from '../Loading/Loading';
import { selectUser, updateDataUser } from '../../redux/Slices/user';
import { IUpdatedData } from '../../redux/Slices/types';

const ProfileEditModal: FC<IProps> = ({ isOpenEditModal, setIsOpenEditModal }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const {
        register,
        handleSubmit,
        formState: { touchedFields, errors, isValid },
    } = useForm<EditFormValues>({ mode: 'onChange' });

    const theme = useAppSelector(selectTheme);
    const [resetValid, setResetValid] = useState<boolean>(true);

    const handleCloseEditModal = () => {
        setIsOpenEditModal(false);
    };

    const updateStatus = useAppSelector((state) => state.user.updateStatus);

    const onSubmit = async (values: EditFormValues) => {
        const isEdited: boolean = Boolean(
            values.email !== user?.email ||
                values.password ||
                values.userName !== user?.fullName ||
                values.avatarUrl !== user?.avatarUrl
        );
        if (isEdited) {
            const data: IUpdatedData = {
                userId: user?._id,
                user: {
                    email: values.email,
                    fullName: values.userName,
                    avatarUrl: values.avatarUrl !== undefined ? values.avatarUrl : '',
                },
            };
            if (values.password) {
                data.user.password = values.password;
            }
            const res: any = await dispatch(updateDataUser(data));
            if (!res.payload) {
                return alert('Не удалось изменить данные');
            }
            if (res.payload) {
                setIsOpenEditModal(false);
                document.location.reload()
            }
        }
    };

    if (updateStatus === 'loading') {
        return (
            <Modal
                className={s.modal}
                open={isOpenEditModal}
                aria-labelledby='child-modal-title'
                aria-describedby='child-modal-description'
            >
                <Box
                    className={classNames({
                        [s.modal__content]: true,
                        [s.dark]: theme === 'dark',
                    })}
                >
                    <Loading />
                </Box>
            </Modal>
        );
    }

    return (
        <Modal
            className={s.modal}
            open={isOpenEditModal}
            onClose={() => handleCloseEditModal()}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
        >
            <Box
                className={classNames({
                    [s.modal__content]: true,
                    [s.dark]: theme === 'dark',
                })}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('avatarUrl', {
                            minLength: {
                                value: 8,
                                message: 'Минимальная длина должна быть 8',
                            },
                        })}
                        helperText={errors.userName?.message}
                        error={Boolean(errors.userName?.message)}
                        label='Ссылка на аватарку'
                        fullWidth
                        placeholder='👉👈 У нас нет денег на диск, так что просим предоставить аватарку в виде ссылки'
                        margin={'dense'}
                        autoComplete='name'
                        defaultValue={user?.avatarUrl}
                    />
                    <TextField
                        {...register('userName', {
                            required: 'Это обязательное поле',
                            minLength: {
                                value: 8,
                                message: 'Минимальная длина должна быть 8',
                            },
                        })}
                        helperText={errors.userName?.message}
                        error={Boolean(errors.userName?.message)}
                        label='ФИО'
                        fullWidth
                        margin={'dense'}
                        autoComplete='name'
                        defaultValue={user?.fullName}
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
                        defaultValue={user?.email}
                    />
                    <TextField
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'Минимальная длина должна быть 8',
                            },
                        })}
                        helperText={errors.password?.message}
                        error={Boolean(errors.password?.message)}
                        label='Изменить пароль на'
                        type='password'
                        autoComplete='new-password'
                        margin={'dense'}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: '20px',
                        }}
                    >
                        <Button color='primary' disabled={!isValid} type='submit'>
                            Подтвердить
                        </Button>
                        <Button disabled={!resetValid} type='reset'>
                            Сбросить
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ProfileEditModal;
