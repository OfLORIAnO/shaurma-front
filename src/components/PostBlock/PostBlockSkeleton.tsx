import React, { FC } from 'react';

import { Box, Grid, Skeleton, Typography } from '@mui/material';

export const PostBlockSkeleton: FC = () => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Skeleton
                animation='wave'
                variant='rounded'
                width={'100%'}
                height={'250px'}
            />
            <Typography variant='h5' sx={{ marginTop: '24px' }}>
                <Skeleton width={'150px'} />
            </Typography>
            <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
                <Skeleton width={'100%'} />
            </Typography>
            <Typography variant='body1' sx={{ marginTop: '8px' }}>
                <Skeleton width={'100%'} />
            </Typography>
            <Box
                sx={{ display: 'flex', width: '100%', height: '40px', marginTop: '10px' }}
            >
                <Skeleton variant='circular' width={48} height={40} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginLeft: '5px',
                    }}
                >
                    <Typography variant='subtitle2' sx={{ width: '150px' }}>
                        <Skeleton width={'100%'} />
                    </Typography>
                    <Typography variant='body1' sx={{ width: '70px' }}>
                        <Skeleton width={'100%'} />
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
};
