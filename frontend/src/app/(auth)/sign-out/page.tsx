/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch } from '@/hocks/redux';
import { signOut } from '@/store/auth.slice';

const SignOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: api 연결
    dispatch(signOut());
    router.push('/');
  }, []);
  return <div>로그아웃 페이지</div>;
};

export default SignOut;
