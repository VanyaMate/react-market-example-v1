import { ICart } from '../cart/cart.interface.ts';
import localStorageDatabaseService, {
    LocalStorageDatabaseService,
    LocalStorageItem,
} from './local-storage-database.service.ts';


export class CartLocalStorageDatabaseService {
    constructor (private readonly storage: LocalStorageDatabaseService) {
    }

    get (userLogin: string): ICart {
        const carts: ICart[]     = this._getCarts();
        const cart: ICart | null = this._findCart(carts, userLogin);

        if (cart) {
            return cart;
        }

        const newCart: ICart = {
            userLogin: userLogin,
            products : [],
        };
        this.saveCart(newCart);

        return newCart;
    }

    saveCart (cart: ICart): void {
        const carts: ICart[]        = this._getCarts();
        const ordCart: ICart | null = this._findCart(carts, cart.userLogin);

        if (ordCart) {
            ordCart.products = cart.products;
        } else {
            carts.push(cart);
        }

        this.save(carts);
    }

    save (carts: ICart[]): void {
        this.storage.set<ICart>(LocalStorageItem.CARTS, carts);
    }

    private _getCarts (): ICart[] {
        return this.storage.get<ICart>(LocalStorageItem.CARTS);
    }

    private _findCart (carts: ICart[], userLogin: string): ICart | null {
        for (let i = 0; i < carts.length; i++) {
            const cart: ICart = carts[i];
            if (cart.userLogin === userLogin) {
                return cart;
            }
        }
        return null;
    }
}

export default new CartLocalStorageDatabaseService(localStorageDatabaseService);