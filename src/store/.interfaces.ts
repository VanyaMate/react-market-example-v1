export interface IService<T, C, U> {
    create (data: C): Promise<T>;

    findOne (data: string): Promise<T | null>;

    findMany (data: Partial<T>): Promise<T[]>;

    update (data: U): Promise<boolean>;

    delete (data: string): Promise<boolean>;
}