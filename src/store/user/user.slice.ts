import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import localStorageConfig from '../../configs/local-storage.config.ts';
import { IUserSlice } from './user.interface.ts';
import { IUser } from '../../services/user/user.interface.ts';

const initialState: IUserSlice = {
    user: null,
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {
        setUser (state: Draft<IUserSlice>, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem(localStorageConfig.currentUserLocalStorage, action.payload.login);
        },
        resetUser (state: Draft<IUserSlice>) {
            state.user = null;
            localStorage.removeItem(localStorageConfig.currentUserLocalStorage);
        },
    },
});