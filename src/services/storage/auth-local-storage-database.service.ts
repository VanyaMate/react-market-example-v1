import localStorageDatabaseService, {
    LocalStorageDatabaseService,
    LocalStorageItem,
} from './local-storage-database.service.ts';


export class AuthLocalStorageDatabaseService {
    constructor (private readonly storage: LocalStorageDatabaseService) {
    }

    getCurrentUserLogin (): string | null {
        const [ user ]: string[] = this.storage.get<string>(LocalStorageItem.CURRENT_USER);
        return user ?? null;
    }

    reset (): void {
        this.storage.set<string>(LocalStorageItem.CURRENT_USER, []);
    }

    set (login: string): void {
        this.storage.set<string>(LocalStorageItem.CURRENT_USER, [ login ]);
    }
}

export default new AuthLocalStorageDatabaseService(localStorageDatabaseService);