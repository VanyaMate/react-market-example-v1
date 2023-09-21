import {
    Category,
    ICategoryService,
} from '@/services/category/category.interface.ts';
import categories from './data/categories.json';


export class CategoryLocalDataService implements ICategoryService {
    constructor (private readonly categories: string[]) {
    }

    getAll (): Promise<Category[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.categories);
            }, 1500);
        });
    }
}

export default new CategoryLocalDataService(categories);