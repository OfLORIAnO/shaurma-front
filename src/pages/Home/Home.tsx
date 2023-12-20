import React, {FC} from 'react';
import {Container, Pagination, Typography, Grid} from '@mui/material';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {fetchAllPosts, selectPosts, selectStatusPosts} from '../../redux/Slices/posts';
import {useNavigate} from 'react-router-dom';
import ErrorLoading from '../../components/ErrorLoading';
import {PostBlockSkeleton} from '../../components/PostBlock/PostBlockSkeleton';
import {IPost} from '../../redux/Slices/types';
import {PostBlock} from '../../components/PostBlock';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const wasRender = React.useRef(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(6);
  const [length, setLength] = React.useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    wasRender.current = true;
  }, []);
  useEffect(() => {
    const getData = async () => {
      const {payload}: any = await dispatch(fetchAllPosts({page, limit}));
      if (payload) {
        setLength(payload.length);
        navigate(`/?limit=${limit}&page=${page}`);
      }
    };
    if (wasRender) {
      getData();
    }
  }, [page]);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectStatusPosts);
  const reloadData = () => {
    dispatch(fetchAllPosts({page, limit}));
  };
  const renderPopularPosts = (): JSX.Element | JSX.Element[] => {
    if (postsStatus === 'loaded') {
      return posts.map((item: IPost) => {
        return <PostBlock key={item._id} item={item} />;
      });
    }
    if (postsStatus === 'loading') {
      return [...Array(4)].map((_, i) => {
        return <PostBlockSkeleton key={i} />;
      });
    } else {
      return <ErrorLoading text={'постов'} func={() => reloadData()} />;
    }
  };

  return (
    <>
      <Container>
        <Typography color='secondary' variant='h2'>
          Главная
        </Typography>
        <Grid container spacing={4}>
          {renderPopularPosts()}
        </Grid>
        {length > limit && (
          <Pagination
            count={Math.ceil(length / limit)}
            variant='outlined'
            color='primary'
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
            onChange={handleChangePage}
          />
        )}
      </Container>
    </>
  );
};
