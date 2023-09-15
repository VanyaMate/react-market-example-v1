export interface IUser {
    [key: string]: any;

    avatar: string;
    login: string;
    password: string;
}

export interface IUserSlice {
    user: IUser | null;
}

export type CreateUserDto =
    {
        login: string;
        password: string
    }
    & Partial<Omit<IUser, 'login' | 'password'>>

export type UpdateUserDto =
    {
        login: string;
    }
    & Partial<Omit<IUser, 'login'>>