import { useDispatch } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { userSlice } from '../../store/user/user.slice.ts';
import { cartSlice } from '../../store/cart/cart.slice.ts';


export const useActions = function () {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    return {
        [userSlice.name]: bindActionCreators(userSlice.actions, dispatch),
        [cartSlice.name]: bindActionCreators(cartSlice.actions, dispatch),
    };
};