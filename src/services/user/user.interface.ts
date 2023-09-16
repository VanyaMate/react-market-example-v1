export interface IUser {
    login: string;
    avatar: string;
}

export interface IPrivateUser extends IUser {
    passport: string;
}