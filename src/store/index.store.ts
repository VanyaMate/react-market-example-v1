import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.slice.ts';
import { cartSlice } from './cart/cart.slice.ts';


export const store = configureStore({
    reducer   : {
        [userSlice.name]: userSlice.reducer,
        [cartSlice.name]: cartSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([]),
});

export type RootStore = ReturnType<typeof store.getState>;