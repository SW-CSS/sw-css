'use client';

import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { signOut } from '@/store/auth.slice';

export default function SignOutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  if (!auth.isAuth) router.push('/');

  dispatch(signOut());
  setTimeout(() => {
    router.refresh();
  }, 0);

  return <></>;
}
