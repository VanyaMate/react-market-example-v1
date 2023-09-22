import {
    IMultiplyResponse,
    IProduct,
    IProductService,
    ProductSearchOptions, SearchOptions,
} from '@/services/product/product.interface.ts';
import { Category } from '@/services/category/category.interface.ts';
import productList_1 from './data/products-1.json';
import productList_2 from './data/products-2.json';
import { productLocalDataToProduct } from '@/mappers/product.mapper.ts';
import { NO_VALID_DATA } from '@/configs/errors.config.ts';


export interface IProductLocalData {
    product_name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    weight: number;
    dimensions: string;
    color: string;
    material: string;
    expiration_date: string;
    manufacturer: string;
    origin_country: string;
    barcode: number;
    rating: number;
    reviews: number;
    is_available: boolean;
    is_on_sale: boolean;
    sale_price: number;
    discount_percentage: number;
    promotion_start_date: string;
    promotion_end_date: string;
    is_featured: boolean;
    image_url: string;
    video_url: string;
    related_products: any[];
    tags: string;
}

export class ProductLocalDataService implements IProductService {
    private readonly products: IProductLocalData[] = [];

    constructor (...products: IProductLocalData[]) {
        this.products = products;
    }

    getByCategory (category: Category, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        const limit: number                 = options.limit ?? 10;
        const offset: number                = options.offset ?? 0;
        const products: IProductLocalData[] = this.products
            .filter((product) => product.category === category);
        return new Promise((resolve) => {
            resolve({
                limit   : limit,
                offset  : offset,
                total   : products.length,
                products: products
                    .slice(offset, offset + limit)
                    .map((product) => productLocalDataToProduct(product)),
            });
        });
    }

    getBySearch (where: ProductSearchOptions, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        const limit: number                 = options.limit ?? 10;
        const offset: number                = options.offset ?? 0;
        const products: IProductLocalData[] = this.products
            .filter((product) => product.product_name.includes(where.title));
        return new Promise((resolve) => {
            resolve({
                limit   : limit,
                offset  : offset,
                total   : products.length,
                products: products
                    .slice(offset, offset + limit)
                    .map((product) => productLocalDataToProduct(product)),
            });
        });
    }

    getProduct (id: number): Promise<IProduct> {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.products.length; i++) {
                const product: IProductLocalData = this.products[i];
                if (product.barcode === id) {
                    resolve(productLocalDataToProduct(product));
                }
            }
            reject(NO_VALID_DATA);
        });
    }

    getProducts (options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        const limit: number  = options.limit ?? 10;
        const offset: number = options.offset ?? 0;
        return new Promise((resolve) => {
            resolve({
                limit   : limit,
                offset  : offset,
                total   : this.products.length,
                products: this.products.slice(offset, offset + limit).map((product) => productLocalDataToProduct(product)),
            });
        });
    }
}

export default new ProductLocalDataService(
    ...productList_1,
    ...productList_2,
);