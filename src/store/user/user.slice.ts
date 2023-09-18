import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
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
        },
        resetUser (state: Draft<IUserSlice>) {
            state.user = null;
        },
    },
});