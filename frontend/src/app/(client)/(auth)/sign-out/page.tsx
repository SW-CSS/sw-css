'use client';

import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { signOut } from '@/store/auth.slice';
import { useEffect } from 'react';

export default function SignOutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.value);

  useEffect(() => {
    if (!auth.isAuth) router.push('/', { scroll: false });

    dispatch(signOut());
    router.push('/sign-in', { scroll: false });
  }, [auth, router, dispatch]);

  return null;
}
