import { Category, ICategoryService } from '../category.interface.ts';


export class CategoryDummyService implements ICategoryService {
    private readonly apiUrl: string = 'https://dummyjson.com/products/categories';

    getAll (): Promise<Category[]> {
        return new Promise(async (resolve) => {
            const list: string [] = await fetch(this.apiUrl).then((response) => response.json());
            setTimeout(() => {
                resolve(list);
            }, 1500);
        });
    }
}

export default new CategoryDummyService();