import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  username: string;
  uid: string;
  isModerator: boolean;
}

interface AuthSliceState extends AuthState {
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
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<AuthState>) => ({
      value: {
        token: action.payload.token,
        isAuth: true,
        username: action.payload.username,
        uid: action.payload.uid,
        isModerator: action.payload.isModerator,
      },
    }),
  },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
