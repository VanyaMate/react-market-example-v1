export enum LocalStorageItem {
    USERS        = '_market_ls-db_users',
    CARTS        = '_market_ls-db_carts',
    CURRENT_USER = '_market_ls-db_current-user',
}

export class LocalStorageDatabaseService {
    constructor (private readonly storage: Storage) {
    }

    get<T> (type: LocalStorageItem): T[] {
        const items: string | null = this.storage.getItem(type);
        return items ? JSON.parse(items) : [];
    }

    set<T> (type: LocalStorageItem, items: T[]): void {
        this.storage.setItem(type, JSON.stringify(items));
    }
}

export default new LocalStorageDatabaseService(localStorage);