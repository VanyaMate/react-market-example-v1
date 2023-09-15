import { CreateCartDto, ICart, UpdateCartDto } from './cart.interfaces.ts';
import { IService } from '../.interfaces.ts';


export interface ICartService extends IService<ICart, CreateCartDto, UpdateCartDto> {

}

export class CartLocalStorageService implements ICartService {
    create (data: CreateCartDto): Promise<ICart> {
        return Promise.resolve(undefined);
    }

    delete (data: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    findMany (data: Partial<ICart>): Promise<ICart[]> {
        return Promise.resolve([]);
    }

    findOne (data: string): Promise<ICart | null> {
        return Promise.resolve(undefined);
    }

    update (data: UpdateCartDto): Promise<boolean> {
        return Promise.resolve(false);
    }

}

export default new CartLocalStorageService();