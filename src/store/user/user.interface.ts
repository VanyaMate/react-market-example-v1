import { IUser } from '../../services/user/user.interface.ts';


export interface IUserSlice {
    user: IUser | null;
}