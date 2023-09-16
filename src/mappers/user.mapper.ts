import { IPrivateUser, IUser } from '../services/user/user.interface.ts';


export const convertPrivateUserToUser = function (privateUser: IPrivateUser): IUser {
    return {
        login : privateUser.login,
        avatar: privateUser.avatar,
    };
};