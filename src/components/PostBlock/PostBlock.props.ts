import { IPost } from '../../redux/Slices/types';

export interface IProps {
    size?: 'large';
    fromProfile?: boolean;
    item: IPost;
}
