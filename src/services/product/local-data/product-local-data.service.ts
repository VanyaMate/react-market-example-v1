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
        return new Promise((resolve) => {
            resolve({
                limit   : 10,
                offset  : 0,
                total   : this.products.length,
                products: this.products.slice(0, 10).map((product) => productLocalDataToProduct(product)),
            });
        });
    }

    getBySearch (where: ProductSearchOptions, options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        return new Promise((resolve) => {
            resolve({
                limit   : 10,
                offset  : 0,
                total   : this.products.length,
                products: this.products.slice(0, 10).map((product) => productLocalDataToProduct(product)),
            });
        });
    }

    getProduct (id: number): Promise<IProduct> {
        return new Promise((resolve) => {
            resolve(productLocalDataToProduct(this.products[0]));
        });
    }

    getProducts (options: SearchOptions<IProduct>): Promise<IMultiplyResponse<IProduct>> {
        return new Promise((resolve) => {
            resolve({
                limit   : 10,
                offset  : 0,
                total   : this.products.length,
                products: this.products.slice(0, 10).map((product) => productLocalDataToProduct(product)),
            });
        });
    }
}

export default new ProductLocalDataService(
    ...productList_1,
    ...productList_2,
);