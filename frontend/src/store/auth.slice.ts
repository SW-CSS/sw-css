/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cookie from 'react-cookies';

export interface AuthState {
  token: string;
  username: string;
  uid: string;
  isModerator: boolean;
}

export interface AuthSliceState extends AuthState {
  token: string;
  isAuth: boolean; // 로그인되어 있는지.
  username: string;
  uid: string;
  isModerator: boolean; // 관리자 계정인지.
}

interface InitialState {
  value: AuthSliceState;
}

const initialState: InitialState = {
  value: {
    token: '',
    isAuth: false,
    username: '',
    uid: '',
    isModerator: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      cookie.save('auth', JSON.stringify({ ...action.payload, isAuth: true }), {});
      state.value = { ...action.payload, isAuth: true };
    },
    signOut: (state) => {
      cookie.remove('auth');
      state.value = initialState.value;
    },
  },
});

export const { signOut, signIn } = authSlice.actions;
export default authSlice.reducer;
