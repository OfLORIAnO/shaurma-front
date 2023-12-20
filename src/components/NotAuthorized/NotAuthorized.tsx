import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Container, Typography } from '@mui/material';
import s from './NotAuthorized.module.scss';
const NotAuthorized = () => {
    return (
        <Container sx={{ marginTop: '20px' }}>
            <Typography color='secondary' variant='subtitle1'>
                Вы неавторизированы
            </Typography>
            <div className={s.notAuthorized}>
                <Link to='/login'>
                    <Button func={() => console.log(true)} color={'primary'}>
                        Войти
                    </Button>
                </Link>
                <Link to='/register'>
                    <Button func={() => console.log(true)} color={'default'}>
                        Зарегистрироваться
                    </Button>
                </Link>
            </div>
        </Container>
    );
};

export default NotAuthorized;
