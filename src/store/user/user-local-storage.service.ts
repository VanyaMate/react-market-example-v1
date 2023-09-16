import {
    CreateUserDto,
    IUser,
    UpdateUserDto,
} from './user.interfaces.ts';
import { ISearchOptions, IService } from '../.interfaces.ts';
import localStorageConfig from '../../configs/local-storage.config.ts';


export interface IUserService extends IService<IUser, CreateUserDto, UpdateUserDto> {
    loading: boolean;

    getCurrentUser (): Promise<IUser | null>;
}

export class UserLocalStorageService implements IUserService {
    private readonly users: IUser[] = [];
    public loading: boolean         = false;

    constructor () {
        const storage: string | null = localStorage.getItem(localStorageConfig.usersLocalStorage);
        if (storage) {
            this.users = JSON.parse(storage);
        }
    }

    create (createDto: CreateUserDto): Promise<IUser> {
        this.loading = true;
        return new Promise(async (resolve, reject) => {
            const { login, password } = createDto;
            const user: IUser | null  = await this.findOne(createDto.login);

            if (user) {
                reject('Такой пользователь уже существует');
            } else {
                const user: IUser = {
                    login   : login,
                    password: password,
                    avatar  : '/avatar.png',
                };
                this.users.push(user);
                this._save(this.users);

                setTimeout(() => {
                    this.loading = false;
                    resolve(user);
                }, 1600);
            }
        });
    }

    delete (login: string): Promise<boolean> {
        this.loading = true;
        return new Promise(async (resolve) => {
            let deleted: boolean = false;

            for (let i = 0; i < this.users.length; i++) {
                const user: IUser = this.users[i];
                if (user.login === login) {
                    this.users.splice(i, 1);
                    this._save(this.users);
                    deleted = true;
                    break;
                }
            }

            setTimeout(() => {
                this.loading = false;
                resolve(deleted);
            }, 1600);
        });
    }

    findOne (login: string): Promise<IUser | null> {
        this.loading = true;
        return new Promise((resolve) => {
            let user: IUser | null = null;

            for (let i = 0; i < this.users.length; i++) {
                const currentUser: IUser = this.users[i];
                if (currentUser.login === login) {
                    user = currentUser;
                    break;
                }
            }

            setTimeout(() => {
                this.loading = false;
                resolve(user);
            }, 1300);
        });
    }

    findMany (_d: Partial<IUser>, _: ISearchOptions<IUser>): Promise<IUser[]> {
        return Promise.resolve(this.users);
    }

    update (data: UpdateUserDto): Promise<IUser | null> {
        this.loading = true;
        return new Promise((resolve) => {
            setTimeout(async () => {
                const user: IUser | null = await this.findOne(data.login);
                if (user) {
                    for (let i = 0; i < this.users.length; i++) {
                        const currentUser: IUser = this.users[i];
                        if (currentUser.login === data.login) {
                            const newUserData: IUser = {
                                ...currentUser,
                                ...data,
                            };
                            this.users.splice(i, 1, newUserData);
                            this._save(this.users);
                            this.loading = false;
                            resolve(newUserData);
                            break;
                        }
                    }
                    this.loading = false;
                    resolve(null);
                }
                this.loading = false;
                resolve(null);
            }, 1500);
        });
    }

    private _save (users: IUser[]): void {
        localStorage.setItem(localStorageConfig.usersLocalStorage, JSON.stringify(users));
    }

    getCurrentUser (): Promise<IUser | null> {
        this.loading = true;
        return new Promise(async (resolve) => {
            const currentLogin: string | null = localStorage.getItem(localStorageConfig.currentUserLocalStorage);
            const user: IUser | null          = currentLogin
                                                ? await this.findOne(currentLogin)
                                                : null;
            setTimeout(() => {
                this.loading = false;
                resolve(user);
            }, 1000);
        });
    }
}

export default new UserLocalStorageService();