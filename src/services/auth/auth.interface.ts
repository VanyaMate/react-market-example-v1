import { IUser } from '../user/user.interface.ts';
import { ICart } from '../cart/cart.interface.ts';


export interface IAuthData {
    user: IUser;
    cart: ICart;
}

export interface IAuthService {
    login (login: string, password: string): Promise<IAuthData>;

    register (login: string, password: string): Promise<IAuthData>;

    refresh (): Promise<IAuthData>;

    logout (): Promise<boolean>;
}