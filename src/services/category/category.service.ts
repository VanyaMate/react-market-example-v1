import { Category, ICategoryService } from './category.interface.ts';


export class CategoryService implements ICategoryService {
    private readonly apiUrl: string = 'https://dummyjson.com/products/categories';

    getAll (): Promise<Category[]> {
        return fetch(this.apiUrl).then((response) => response.json());
    }
}

export default new CategoryService();