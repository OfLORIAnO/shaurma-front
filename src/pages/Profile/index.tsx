import React, { FC, useEffect, useRef, useState } from 'react';

import { Avatar, Box, Container, Pagination, Typography } from '@mui/material';
import classNames from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { selectTheme, setTheme } from '../../redux/Slices/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AddIcon from '@mui/icons-material/Add';

import { Button } from '../../components/Button/Button';
import ErrorLoading from '../../components/ErrorLoading';
import { PostBlock } from '../../components/PostBlock';
import ProfileEditModal from '../../components/ProfileEditModal/ProfileEditModal';

import { userProps } from './types';
import { selectUser } from '../../redux/Slices/user';
import {
    getPosts,
    selectProfilePosts,
    selectStatusProfile,
    selectUserProfile,
} from '../../redux/Slices/profile';

import s from './Profile.module.scss';
import Loading from '../../components/Loading/Loading';

export const Profile: FC = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = React.useState(1);
    const limit = 6;
    const [length, setLength] = React.useState(9);
    const isChangedPage = useRef(false);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const id = useParams().id;
    const authedUserId = useAppSelector(selectUser);
    const user = useAppSelector(selectUserProfile);
    const profilePosts = useAppSelector(selectProfilePosts);
    const isYour: boolean = id === authedUserId?._id;

    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const handleOpenEditModal = () => {
        setIsOpenEditModal(true);
    };

    const theme = useAppSelector(selectTheme);
    const changeTheme = () => {
        dispatch(setTheme());
    };

    const navigate = useNavigate();

    useEffect(() => {
        isChangedPage.current = true;
    }, []);

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const res: any = await dispatch(
                    getPosts({
                        userId: id,
                        page,
                        limit,
                    })
                );
                if (res.payload) {
                    setLength(res.payload.length);
                }
            }
        };
        if (isChangedPage.current) {
            getData();
        }
    }, [id, page]);
    const [userData, setUserData] = useState<userProps>({
        email: 'Yd9p0@example.com',
        userName: 'Иванов Иван Иванович',
        userImg: 'https://cdn-edge.kwork.ru/files/avatar/large/52/15318475-1.jpg',
        userNickName: 'Worker',
    });
    const reloadProfilePosts: () => void = () => {
        console.log('reloaded');
    };
    const loadingStatus = useAppSelector(selectStatusProfile);
    if (loadingStatus === 'loading') {
        return (
            <Container
                sx={{
                    width: '120px',
                    margin: '0 auto',
                }}
            >
                <Loading />
            </Container>
        );
    }
    return (
        <>
            <Container>
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography color='secondary' variant='h2'>
                        Профиль
                    </Typography>
                    {theme === 'dark' ? (
                        <LightModeIcon
                            color='secondary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeTheme()}
                        />
                    ) : (
                        <Brightness4Icon
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeTheme()}
                            color='secondary'
                        />
                    )}
                </Container>
            </Container>
            {user ? (
                <Container>
                    <Container>
                        <Box
                            className={classNames({
                                [s.profile]: true,
                                [s.dark]: theme === 'dark',
                            })}
                        >
                            <Box className={s.profile__text}>
                                <Avatar
                                    className={s.avatar}
                                    alt={user?.fullName}
                                    src={user?.avatarUrl && user.avatarUrl}
                                />
                                <Box className={s.profile__nickname}>
                                    <Typography color='secondary' variant='h5'>
                                        {user?.fullName}
                                    </Typography>
                                </Box>
                            </Box>
                            {isYour && (
                                <Button
                                    profile={true}
                                    color='default'
                                    func={handleOpenEditModal}
                                >
                                    Редактировать профиль
                                </Button>
                            )}
                        </Box>
                        <ProfileEditModal
                            isOpenEditModal={isOpenEditModal}
                            setIsOpenEditModal={setIsOpenEditModal}
                        />
                    </Container>
                    {isYour && (
                        <Container>
                            <Box
                                className={classNames({
                                    [s.create__button]: true,
                                    [s.dark]: theme === 'dark',
                                })}
                            >
                                <Link to='/addArticle'>
                                    <Button
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                        }}
                                        color='primary'
                                    >
                                        <AddIcon />
                                        Создать пост
                                    </Button>
                                </Link>
                            </Box>
                        </Container>
                    )}

                    <Container sx={{ padding: '50px 0 10px 0' }}>
                        {length > limit ? (
                            <Pagination
                                page={page}
                                count={Math.ceil(length / limit)}
                                variant='outlined'
                                color='primary'
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                }}
                                onChange={handleChangePage}
                            />
                        ) : null}

                        {loadingStatus === 'loaded' ? (
                            profilePosts?.length ? (
                                profilePosts.map((item) => (
                                    <Box
                                        key={item._id}
                                        sx={{
                                            width: '100%',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <PostBlock
                                            fromProfile={true}
                                            item={item}
                                            size={'large'}
                                        />
                                    </Box>
                                ))
                            ) : (
                                <Box>
                                    <Typography color='secondary' variant='h3'>
                                        У пользователя нет статей
                                    </Typography>
                                </Box>
                            )
                        ) : (
                            <ErrorLoading
                                text={'статей'}
                                func={() => reloadProfilePosts()}
                            />
                        )}
                    </Container>
                    {length > limit ? (
                        <Pagination
                            page={page}
                            count={Math.ceil(length / limit)}
                            variant='outlined'
                            color='primary'
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            onChange={handleChangePage}
                        />
                    ) : null}
                </Container>
            ) : (
                <Container>
                    <Typography color='secondary' variant='h3'>
                        Пользователь не найден
                    </Typography>
                </Container>
            )}
        </>
    );
};
