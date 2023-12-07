import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import UserModel from '../../network/models/UserModel';

export interface AuthState {
    user: UserModel | undefined;
}

const initialState: AuthState = {
    user: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        _signIn: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        },
        _updateUser: (state, action: PayloadAction<Partial<UserModel>>) => {
            // @ts-ignore
            state.user = {
                ...state.user,
                ...action.payload
            }
        },
        _signOut: state => {
            state.user = undefined;
        },
    },
});

export const {_signIn, _signOut, _updateUser,} = authSlice.actions;

const AuthReducer = authSlice.reducer;

export default AuthReducer;