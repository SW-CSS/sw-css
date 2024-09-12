/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { signOut } from '@/store/auth.slice';

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  if (!auth.isAuth) router.push('/');

  // TODO: api 연결
  dispatch(signOut());
  setTimeout(() => {
    router.refresh();
  }, 0);

  return null;
};

export default Page;
