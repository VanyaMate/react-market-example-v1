import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from './cart.interfaces.ts';


export interface ICartSlice {
    cart: ICart;
}

const initialState: ICartSlice = {
    cart: {
        userLogin: '',
        products : [],
    },
};

export const cartSlice = createSlice({
    name        : 'cart',
    initialState: initialState,
    reducers    : {
        setCart (state: Draft<ICartSlice>, action: PayloadAction<ICart>) {
            state.cart = action.payload;
        },
        resetCart (state: Draft<ICartSlice>) {
            state.cart = {
                userLogin: '',
                products : [],
            };
        },
    },
});