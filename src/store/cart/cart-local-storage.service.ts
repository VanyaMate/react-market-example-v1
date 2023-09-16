import { CreateCartDto, ICart, UpdateCartDto } from './cart.interfaces.ts';
import { ISearchOptions, IService } from '../.interfaces.ts';
import localStorageConfig from '../../configs/local-storage.config.ts';


export interface ICartService extends IService<ICart, CreateCartDto, UpdateCartDto> {

}

export class CartLocalStorageService implements ICartService {
    private readonly carts: ICart[] = [];

    constructor () {
        const storage: string | null = localStorage.getItem(localStorageConfig.cartsLocalStorage);
        if (storage) {
            this.carts = JSON.parse(storage);
        }
    }

    create (createCartDto: CreateCartDto): Promise<ICart> {
        return new Promise<ICart>(async (resolve) => {
            const existedCart: ICart | null = await this.findOne(createCartDto.userLogin);
            if (existedCart) {
                resolve(existedCart);
            } else {
                const cart: ICart = {
                    userLogin: createCartDto.userLogin,
                    products : [],
                };
                this.carts.push(cart);
                this._save(this.carts);
                resolve(cart);
            }
        });
    }

    delete (userLogin: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            for (let i = 0; i < this.carts.length; i++) {
                const cart: ICart = this.carts[i];
                if (cart.userLogin === userLogin) {
                    this.carts.splice(i, 1);
                    this._save(this.carts);
                    resolve(true);
                }
            }

            resolve(false);
        });
    }

    findMany (_d: Partial<ICart>, _s: ISearchOptions<ICart>): Promise<ICart[]> {
        return Promise.resolve(this.carts);
    }

    findOne (userLogin: string): Promise<ICart | null> {
        return new Promise((resolve) => {
            for (let i = 0; i < this.carts.length; i++) {
                const cart: ICart = this.carts[i];
                if (cart.userLogin === userLogin) {
                    resolve(cart);
                }
            }

            resolve(null);
        });
    }

    update (data: UpdateCartDto): Promise<ICart | null> {
        return new Promise((resolve) => {
            for (let i = 0; i < this.carts.length; i++) {
                const cart: ICart = this.carts[i];
                if (cart.userLogin === data.userLogin) {
                    cart.products = data.products;
                    this._save(this.carts);
                    resolve(cart);
                }
            }

            resolve(null);
        });
    }

    private _save (carts: ICart[]): void {
        localStorage.setItem(localStorageConfig.cartsLocalStorage, JSON.stringify(carts));
    }
}

export default new CartLocalStorageService();