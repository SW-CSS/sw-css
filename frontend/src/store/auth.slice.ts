import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cookie from 'react-cookies';

export interface AuthState {
  readonly id: number;
  token: string;
  name: string;
  email: string;
  isModerator: boolean; // 관리자 계정인지.
}

export interface AuthSliceState extends AuthState {
  isAuth: boolean; // 로그인되어 있는지.
}

interface InitialState {
  value: AuthSliceState;
}

const initialState: InitialState = {
  value: {
    id: -1,
    token: '',
    name: '',
    email: '',
    isAuth: false,
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
