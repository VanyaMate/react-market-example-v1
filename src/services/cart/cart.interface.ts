import { IProduct } from '../product/product.interface.ts';


export interface ICartItem {
    product: IProduct,
    amount: number;
}

export interface ICart {
    userLogin: string;
    products: ICartItem[];
}

export interface ICartService {
    addToCart (cart: ICart, product: IProduct, amount: number): Promise<ICart>;

    resetCart (cart: ICart): Promise<ICart>;
}