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
    signOut: (state) => {
      state.value = initialState.value;
      cookie.save('auth', '', {});
    },
    signIn: (state, action: PayloadAction<AuthState>) => {
      state.value = {
        token: action.payload.token,
        isAuth: true,
        username: action.payload.username,
        uid: action.payload.uid,
        isModerator: action.payload.isModerator,
      };
      cookie.remove('auth');
    },
  },
});

export const { signOut, signIn } = authSlice.actions;
export default authSlice.reducer;
