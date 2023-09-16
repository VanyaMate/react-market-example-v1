import { IAuthData, IAuthService } from './auth.interface.ts';
import { IPrivateUser } from '../user/user.interface.ts';
import userLocalStorageDatabaseService, {
    UserLocalStorageDatabaseService,
} from '../storage/user-local-storage-database.service.ts';
import cartLocalStorageDatabaseService, {
    CartLocalStorageDatabaseService,
} from '../storage/cart-local-storage-database.service.ts';
import { ICart } from '../cart/cart.interface.ts';
import authLocalStorageDatabaseService, {
    AuthLocalStorageDatabaseService,
} from '../storage/auth-local-storage-database.service.ts';
import { convertPrivateUserToUser } from '../../mappers/user.mapper.ts';
import { NO_VALID_DATA } from '../../configs/errors.config.ts';


export class AuthLocalStorageService implements IAuthService {
    constructor (private readonly authDatabase: AuthLocalStorageDatabaseService,
                 private readonly userDatabase: UserLocalStorageDatabaseService,
                 private readonly cartDatabase: CartLocalStorageDatabaseService) {
    }

    login (login: string, password: string): Promise<IAuthData> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const privateUser: IPrivateUser | null = this.userDatabase.get(login);
                if (privateUser && (privateUser.passport === password)) {
                    resolve(await this._getUserAuthData(privateUser));
                }

                reject(NO_VALID_DATA);
            }, 1500);
        });
    }

    logout (): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.authDatabase.reset();
                resolve(true);
            }, 1000);
        });
    }

    refresh (): Promise<IAuthData> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const login: string | null = this.authDatabase.getCurrentUserLogin();
                if (login) {
                    const privateUser: IPrivateUser | null = this.userDatabase.get(login);
                    if (privateUser) {
                        resolve(this._getUserAuthData(privateUser));
                    }
                }

                reject(NO_VALID_DATA);
            }, 1500);
        });
    }

    register (login: string, password: string): Promise<IAuthData> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const privateUser: IPrivateUser | null = this.userDatabase.get(login);
                if (privateUser && (privateUser.passport === password)) {
                    resolve(await this._getUserAuthData(privateUser));
                }

                const user: IPrivateUser = this.userDatabase.create(login, password);
                resolve(await this._getUserAuthData(user));
            }, 1500);
        });
    }

    private _getUserAuthData (privateUser: IPrivateUser): Promise<IAuthData> {
        return new Promise((resolve) => {
            const cart: ICart = this.cartDatabase.get(privateUser.login);
            resolve({ user: convertPrivateUserToUser(privateUser), cart });
        });
    }

}

export default new AuthLocalStorageService(
    authLocalStorageDatabaseService,
    userLocalStorageDatabaseService,
    cartLocalStorageDatabaseService,
);