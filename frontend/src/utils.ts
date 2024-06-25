import { cookies } from 'next/headers';

import { AuthSliceState } from './store/auth.slice';

export const getAuthFromCookie = (): AuthSliceState => {
  const authJSON = cookies().get('auth')?.value;
  const auth: AuthSliceState = JSON.parse(
    authJSON || '{"token": "", "isAuth": false, "username": "", "uid": "", "isModerator": false}',
  );
  return auth;
};
