import { IProduct } from '../products/product.interfaces.ts';


export interface ICart {
    userLogin: string;
    products: IProduct[];
}

export interface ICartSlice {
    cart: ICart;
}

export type CreateCartDto = {
    userLogin: string;
}

export type UpdateCartDto = ICart;