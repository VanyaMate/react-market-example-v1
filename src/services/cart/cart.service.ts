import { ICart, ICartItem, ICartService } from './cart.interface.ts';
import cartLocalStorageDatabaseService, {
    CartLocalStorageDatabaseService,
} from '../storage/cart-local-storage-database.service.ts';
import { IProduct } from '../product/product.interface.ts';


export class CartService implements ICartService {
    constructor (private readonly cartStorage: CartLocalStorageDatabaseService) {
    }

    addToCart (cart: ICart, product: IProduct, amount: number): Promise<ICart> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const cartItem: ICartItem | null = this._findInCart(cart, product);
                if (cartItem) {
                    if ((cartItem.amount + amount) > 0) {
                        cartItem.amount += amount;
                    } else {
                        cart.products.filter((item) => {
                            return item !== cartItem;
                        });
                    }
                } else {
                    cart.products.push({
                        product: product,
                        amount : amount,
                    });
                }
                this.cartStorage.saveCart(cart);
                resolve(cart);
            }, 1000);
        });
    }

    resetCart (cart: ICart): Promise<ICart> {
        return new Promise((resolve) => {
            setTimeout(() => {
                cart.products = [];
                this.cartStorage.saveCart(cart);
                resolve(cart);
            }, 1500);
        });
    }

    private _findInCart (cart: ICart, product: IProduct): ICartItem | null {
        const items: ICartItem[] = cart.products;
        for (let i = 0; i < items.length; i++) {
            const item: ICartItem = items[i];
            if (item.product.id === product.id) {
                return item;
            }
        }

        return null;
    }
}

export default new CartService(
    cartLocalStorageDatabaseService,
);