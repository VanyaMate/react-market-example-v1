import { IPrivateUser } from '../user/user.interface.ts';
import localStorageDatabaseService, {
    LocalStorageDatabaseService,
    LocalStorageItem,
} from './local-storage-database.service.ts';


export class UserLocalStorageDatabaseService {
    constructor (private readonly storage: LocalStorageDatabaseService) {
    }

    get (login: string): IPrivateUser | null {
        const privateUsers: IPrivateUser[]     = this._getUsers();
        const privateUser: IPrivateUser | null = this._findUser(privateUsers, login);

        return privateUser;
    }

    create (login: string, passport: string): IPrivateUser {
        const privateUsers: IPrivateUser[]     = this._getUsers();
        const privateUser: IPrivateUser | null = this._findUser(privateUsers, login);

        if (privateUser) {
            return privateUser;
        }

        const newUser: IPrivateUser = {
            login   : login,
            passport: passport,
            avatar  : '',
        };

        privateUsers.push(newUser);
        this.storage.set<IPrivateUser>(LocalStorageItem.USERS, privateUsers);
        return newUser;
    }

    private _getUsers (): IPrivateUser[] {
        return this.storage.get<IPrivateUser>(LocalStorageItem.USERS);
    }

    private _findUser (users: IPrivateUser[], login: string): IPrivateUser | null {
        for (let i = 0; i < users.length; i++) {
            const user: IPrivateUser = users[i];
            if (user.login === login) {
                return user;
            }
        }
        return null;
    }
}

export default new UserLocalStorageDatabaseService(localStorageDatabaseService);