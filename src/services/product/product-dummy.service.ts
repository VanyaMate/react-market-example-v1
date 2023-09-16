import {
    IMultiplyResponse,
    IProduct,
    IProductService, ProductSearchOptions,
    SearchOptions,
} from './product.interface.ts';
import { Category } from '../category/category.interface.ts';


export class ProductDummyService implements IProductService {
    private readonly apiUrl: string = 'https://dummyjson.com/products';

    getByCategory (category: Category, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        return fetch(this.apiUrl + '/category/' + category + '?' + new URLSearchParams(this._getSearchParams(options)))
            .then((response) => response.json());
    }

    getProduct (id: number): Promise<IProduct> {
        return fetch(this.apiUrl + '/' + id)
            .then((response) => response.json());
    }

    getProducts (options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        return fetch(this.apiUrl + '?' + new URLSearchParams(this._getSearchParams(options)))
            .then((response) => response.json());
    }

    getBySearch (where: ProductSearchOptions, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        return fetch(this.apiUrl + '/search?' + new URLSearchParams({
            ...this._getSearchParams(options), q: where.title,
        }))
            .then((response) => response.json());
    }

    private _getSearchParams (options: SearchOptions<IProduct>): Record<string, string> {
        const { select, offset, limit }      = options;
        const params: Record<string, string> = {};
        if (select) params.select = select.join(',');
        if (offset) params.skip = offset.toString();
        if (limit) params.limit = limit.toString();
        return params;
    }
}

export default new ProductDummyService();