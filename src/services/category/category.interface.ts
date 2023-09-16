export type Category = string;

export interface ICategoryService {
    getAll (): Promise<Category[]>;
}