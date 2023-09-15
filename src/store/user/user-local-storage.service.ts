import {
    CreateUserDto,
    IUser,
    UpdateUserDto,
} from './user.interfaces.ts';
import { IService } from '../.interfaces.ts';
import localStorageConfig from '../../configs/local-storage.config.ts';


export interface IUserService extends IService<IUser, CreateUserDto, UpdateUserDto> {
    getCurrentUser (): Promise<IUser | null>;
}

export class UserLocalStorageService implements IUserService {
    private readonly users: IUser[] = [];

    constructor () {
        const storage: string | null = localStorage.getItem(localStorageConfig.usersLocalStorage);
        if (storage) {
            this.users = JSON.parse(storage);
        }
    }

    create (createDto: CreateUserDto): Promise<IUser> {
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
                    resolve(user);
                }, 600);
            }
        });
    }

    delete (login: string): Promise<boolean> {
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
                resolve(deleted);
            }, 600);
        });
    }

    findOne (login: string): Promise<IUser | null> {
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
                resolve(user);
            }, 300);
        });
    }

    findMany (data: Partial<IUser>): Promise<IUser[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const keys: string[] = Object.keys(data);
                const users: IUser[] = this.users.filter((user) => {
                    return keys.every((key) => user[key] === data[key]);
                });

                resolve(users);
            }, 500);
        });
    }

    update (data: UpdateUserDto): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const user: IUser | null = await this.findOne(data.login);
                if (user) {
                    for (let i = 0; i < this.users.length; i++) {
                        const currentUser: IUser = this.users[i];
                        if (currentUser.login === data.login) {
                            this.users.splice(i, 1, {
                                ...currentUser,
                                ...data,
                            });
                            this._save(this.users);
                            resolve(true);
                            break;
                        }
                    }
                    resolve(false);
                }
                resolve(false);
            }, 500);
        });
    }

    private _save (users: IUser[]): void {
        localStorage.setItem(localStorageConfig.usersLocalStorage, JSON.stringify(users));
    }

    getCurrentUser (): Promise<IUser | null> {
        return new Promise(async (resolve) => {
            const currentLogin: string | null = localStorage.getItem(localStorageConfig.currentUserLocalStorage);
            resolve(currentLogin ? await this.findOne(currentLogin) : null);
        });
    }
}

export default new UserLocalStorageService();