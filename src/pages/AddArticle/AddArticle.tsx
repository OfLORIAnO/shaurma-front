import React, { useEffect, useMemo } from 'react';
import s from './AddArticle.module.scss';
import { Button } from '../../components/Button/Button';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Container, Typography, TextField } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectIsAuthed } from '../../redux/Slices/user';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IEditPost, INewPost, IPost } from '../../redux/Slices/types';
import { createArticleFetch, updatePostFetch } from '../../redux/Slices/profile';
import classNames from 'classnames';
import { fetchPost, selectPost } from '../../redux/Slices/post';
import axios from '../../axios';
// import {Container} from '';
const AddArticle = () => {
    const [value, setValue] = React.useState<string>('');
    const [linkPreview, setLinkPreview] = React.useState<string>('');
    const [titleValue, setTitleValue] = React.useState<string>('');
    const navigate = useNavigate();
    const disptach = useAppDispatch();
    const isAuthed = useAppSelector(selectIsAuthed);
    const onChange = React.useCallback((value: string) => {
        setValue(value);
    }, []);

    const editArticle = async () => {
        //Костыль, чтоб TS был уверен, что id !== undefined
        const id2: string = String(id);
        const post: IEditPost = {
            _id: id2,
            title: titleValue,
            text: value,
        };
        if (linkPreview) {
            post.imageUrl = linkPreview;
        }

        const response = await disptach(updatePostFetch(post));
        if (!response.payload) {
            alert('Не удалось отредактировать статью статью');
        } else {
            navigate(`/post/${id2}`);
        }
    };

    const createArticle = async () => {
        const post: INewPost = {
            title: titleValue,
            text: value,
        };
        if (linkPreview) {
            post.imageUrl = linkPreview;
        }
        const response = await disptach(createArticleFetch(post));
        if (!response.payload) {
            alert('Не удалось создать статью');
        } else {
            navigate(`/post/${response.payload._id}`);
        }
    };

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
        }),
        []
    );
    const { id } = useParams();
    const isEdit = Boolean(id);

    useEffect(() => {
        if (id) {
            axios
                .get(`post/${id}`)
                .then((res: { data: IPost }) => {
                    setTitleValue(res.data.title);
                    setLinkPreview(res.data.imageUrl);
                    setValue(res.data.text);
                })
                .catch(() => {
                    alert('Не удалось получить статью');
                    navigate('/');
                });
        }
    }, []);

    if (!isAuthed) {
        return <Navigate to='/' />;
    }
    return (
        <Container>
            <div className={s.header}>
                <Typography color='secondary' variant='h4'>
                    Ссылка на превью
                </Typography>
            </div>
            <div className={s.header}>
                <TextField
                    value={linkPreview}
                    onChange={(e) => setLinkPreview(e.target.value)}
                    className={s.imageLink}
                    placeholder='👉👈 У нас нет денег на диск, поэтому просто вставьте ссылку на фото'
                />
            </div>
            <Typography color='secondary' variant='h3'>
                Название статьи
            </Typography>
            <TextField
                error={titleValue.length < 3}
                helperText={
                    titleValue.length < 3
                        ? 'Длина названия должна быть минимум 3 символа'
                        : ''
                }
                onChange={(e) => setTitleValue(e.target.value)}
                className={s.imageLink}
                placeholder='Введите название статьи'
                value={titleValue}
                style={{ marginBottom: '0' }}
            />
            <div className={classNames({ [s.body]: true, [s.markdown]: true })}>
                <SimpleMde
                    className={s.articleText}
                    value={value}
                    onChange={onChange}
                    options={options}
                />
                <div className={s.button_add}>
                    {isEdit ? (
                        <Button
                            color='primary'
                            style={{ marginTop: '20px' }}
                            func={editArticle}
                        >
                            Редактировать статью
                        </Button>
                    ) : (
                        <Button
                            color='primary'
                            style={{ marginTop: '20px' }}
                            func={createArticle}
                        >
                            Создать статью
                        </Button>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default AddArticle;
