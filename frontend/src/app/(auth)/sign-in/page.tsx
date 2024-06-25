/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useRouter } from 'next/navigation';

import { FONT_STYLE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hocks/redux';
import { signIn } from '@/store/auth.slice';

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  if (auth.isAuth) router.push('/');

  const handleSignInClick = () => {
    // TODO: api 연결
    dispatch(
      signIn({
        token: 'token',
        username: 'name',
        uid: '1',
        isModerator: true,
      }),
    );
    setTimeout(() => {
      router.refresh();
    }, 0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        font: FONT_STYLE.lg.normal,
      }}
    >
      로그인 페이지
      <button
        type="button"
        onClick={handleSignInClick}
        style={{
          font: FONT_STYLE.lg.normal,
        }}
      >
        자동 로그인
      </button>
    </div>
  );
};

export default Page;
