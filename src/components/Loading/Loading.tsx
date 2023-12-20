import React, { FC } from 'react';
import s from './Loading.module.scss';

interface IPops {
    color?: string;
}

const Loading: FC<IPops> = ({ color = '#6941c6' }) => {
    return (
        <div className={s.load3}>
            <div className={s.line} style={{ backgroundColor: color }}></div>
            <div className={s.line} style={{ backgroundColor: color }}></div>
            <div className={s.line} style={{ backgroundColor: color }}></div>
        </div>
    );
};
export default Loading;
