import { HTMLAttributes } from 'react';

export interface IProps extends HTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'primary';
    func?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'submit' | 'reset';
    profile?: boolean;
}
