import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { selectTheme } from '../../redux/Slices/theme';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { dateCoverter, nFormatter } from '../../utils/formatNumbers';

import { Avatar, Box, Grid, Modal, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ReactMarkDown from 'react-markdown';

import { Button } from '../Button/Button';
import { IProps } from './PostBlock.props';
import Loading from '../Loading/Loading';
import { selectUser } from '../../redux/Slices/user';

import s from './PostBlock.module.scss';
import { deletePostFetch, selectDeleteStatus } from '../../redux/Slices/profile';

export const PostBlock: FC<IProps> = ({ item, size, fromProfile = false }) => {
    const theme = useAppSelector(selectTheme);
    const isLoadingDeleting = useAppSelector(selectDeleteStatus);

    const dispatch = useAppDispatch();
    const renderTags = (): JSX.Element[] | null => {
        return item.tags !== undefined
            ? item.tags.map((tag, i) => {
                  return (
                      <Link to={`/${tag}`} key={'tag_' + i}>
                          <Typography color='primary' style={{ display: 'inline' }}>
                              {tag}
                          </Typography>
                      </Link>
                  );
              })
            : null;
    };
    const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false);
    const handleOpen = () => {
        setIsOpenDeleteModal(true);
    };
    const handleClose = () => {
        setIsOpenDeleteModal(false);
    };
    const deletePost = async (): Promise<void> => {
        await dispatch(deletePostFetch(item._id));
        setIsOpenDeleteModal(false);
    };

    const authedUser = useAppSelector(selectUser);
    const isYour: boolean =
        authedUser !== null ? item.user._id === authedUser._id : false;

    // const vews: string = ;
    const likes: string = nFormatter(600);

    const pathToFullScreenPost: string = `/post/${item._id}`;
    const pathToAuthorProfile: string = `/profile/${item.user._id}`;
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                {isOpenDeleteModal && (
                    <Modal
                        className={s.modalDelete}
                        open={isOpenDeleteModal}
                        onClose={
                            isLoadingDeleting !== 'loading'
                                ? handleClose
                                : () => {
                                      console.log('cant close');
                                  }
                        }
                        aria-labelledby='child-modal-title'
                        aria-describedby='child-modal-description'
                    >
                        <Box
                            className={classNames({
                                [s.modalDelete__content]: true,
                                [s.dark]: theme === 'dark',
                            })}
                        >
                            {isLoadingDeleting === 'loading' ? (
                                <Loading />
                            ) : (
                                <>
                                    <Typography
                                        variant='h5'
                                        align='center'
                                        color='secondary'
                                    >
                                        Вы уверены, что хотите удалить пост?
                                    </Typography>
                                    <div className={s.modalDelete__buttons}>
                                        <Button func={handleClose} color='primary'>
                                            Отмена
                                        </Button>
                                        <Button func={deletePost}>Удалить</Button>
                                    </div>
                                </>
                            )}
                        </Box>
                    </Modal>
                )}
                <div
                    className={classNames({
                        [s.post]: true,
                        [s.dark]: theme === 'dark',
                    })}
                >
                    {isYour && fromProfile && (
                        <div className={s.post__control}>
                            <Link to={`/post/${item._id}/edit`}>
                                <Button color='primary'>
                                    <DriveFileRenameOutlineIcon />
                                    Редактировать
                                </Button>
                            </Link>
                            <Button func={handleOpen}>
                                <DeleteIcon />
                                Удалить
                            </Button>
                        </div>
                    )}
                    <Link
                        to={pathToFullScreenPost}
                        className={classNames({
                            [s.your]: isYour && !fromProfile,
                        })}
                    >
                        {isYour && !fromProfile && (
                            <Typography variant='subtitle2' className={s.your__text}>
                                Ваш пост
                            </Typography>
                        )}
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className={classNames({
                                    [s.image]: true,
                                    [s.large]: size === 'large',
                                })}
                            />
                        ) : (
                            <img
                                src='https://rus-traktor.ru/upload/iblock/793/793a53f754ddc2acd77edaea8df4bd44.jpg'
                                className={classNames({
                                    [s.image]: true,
                                    [s.large]: size === 'large',
                                })}
                                alt={item.title}
                            />
                        )}
                    </Link>
                    <div className={s.tags}>{renderTags()}</div>
                    <Link
                        to={pathToFullScreenPost}
                        className={classNames(s.info, s.markdown_description)}
                    >
                        <Typography
                            color='secondary'
                            variant='subtitle2'
                            mt='8px'
                            className={s.text}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            color='gray'
                            className={s.text}
                            variant='body1'
                            mt='8px'
                        >
                            <ReactMarkDown children={item.text} />
                        </Typography>
                    </Link>
                    <div className={s.bottom}>
                        <Link to={pathToAuthorProfile} className={s.buttomInfo}>
                            <div className={s.author}>
                                <Avatar
                                    alt={item.user.fullName}
                                    src={item.user.avatarUrl}
                                />
                                <div className={s.author__info}>
                                    <Typography
                                        color='secondary'
                                        variant='subtitle2'
                                        noWrap
                                    >
                                        {item.user.fullName}
                                    </Typography>
                                    <Typography color='gray' variant='body1' noWrap>
                                        {dateCoverter(item.createdAt)}
                                    </Typography>
                                </div>
                            </div>
                        </Link>
                        <Link to={pathToFullScreenPost} className={s.stats}>
                            <div className={s.views}>
                                <RemoveRedEyeIcon color='secondary' />
                                <Typography variant='body1' color='secondary' noWrap>
                                    {nFormatter(item.viewsCount)}
                                </Typography>
                            </div>
                            {/* <div className={s.likes}>
                                <ThumbUpIcon color='secondary' />
                                <Typography variant='body1' color='secondary' noWrap>
                                    {likes}
                                </Typography>
                            </div> */}
                        </Link>
                    </div>
                </div>
            </Grid>
        </>
    );
};
