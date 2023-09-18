export interface IAuthStorageService {
    getCurrentUserLogin (): string | null;

    set (login: string): void;

    reset (): void;
}