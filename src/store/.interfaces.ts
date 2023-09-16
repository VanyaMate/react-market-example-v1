export type SortOptions<T> = [ keyof T, 'asc' | 'desc' ][]

export interface ISearchOptions<T> {
    limit?: number;
    offset?: number;
    sort?: SortOptions<T>;
}

export interface IService<T, C, U> {
    create (data: C): Promise<T>;

    findOne (data: string): Promise<T | null>;

    findMany (data: Partial<T>, searchOptions: ISearchOptions<T>): Promise<T[]>;

    update (data: U): Promise<T | null>;

    delete (data: string): Promise<boolean>;
}