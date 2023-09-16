import { Category } from '../category/category.interface.ts';


export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export type ProductSearchOptions = {
    title: string,
}

export type SearchOptions<T> = {
    limit?: number,
    offset?: number,
    select?: (keyof T)[],
}

export interface IMultiplyResponse<T> {
    products: T[],
    total: number;
    offset: number;
    limit: number;
}

export interface IProductService {
    getProduct (id: number): Promise<IProduct>;

    getProducts (options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>>;

    getByCategory (category: Category, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>>;

    getBySearch (where: ProductSearchOptions, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>>;
}