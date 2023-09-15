import { useDispatch } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { userSlice } from '../../store/user/user.slice.ts';


export const useActions = function () {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    return {
        [userSlice.name]: bindActionCreators(userSlice.actions, dispatch),
    };
};