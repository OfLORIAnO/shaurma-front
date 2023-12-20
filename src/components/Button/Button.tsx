import React, { FC } from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';
import { selectTheme } from '../../redux/Slices/theme';
import { useAppSelector } from '../../redux/hooks';
import { IProps } from './Button.props';

export const Button: FC<IProps> = ({
    color = 'default',
    func,
    children,
    disabled = false,
    profile = false,
    ...props
}) => {
    const theme = useAppSelector(selectTheme);
    const btnType = classNames({
        [s.button]: true,
        [s.profile]: profile === true,
        [s.dark]: theme === 'dark',
        [s.default]: color === 'default',
        [s.primary]: color === 'primary',
    });
    return (
        <button disabled={disabled} className={btnType} onClick={func} {...props}>
            {children}
        </button>
    );
};
