export interface IEditPost extends INewPost {
    _id: string;
}

export interface INewPost {
    title: string;
    text: string;
    tags?: string[];
    imageUrl?: string;
}

export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags?: string[];
    viewsCount: number;
    imageUrl: string;
    user: IUser;
    createdAt: string;
    updatedAt: string;
}

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IRes extends IPost {
    length: number;
    posts: IPost[];
    user: IUser;
}
export interface IGetProfilePosts {
    userId: string;
    page?: number;
    limit?: number;
}

export interface IUpdatedData {
    userId: string | undefined;
    user: {
        email: string;
        password?: string;
        fullName: string;
        avatarUrl: string;
    };
}
