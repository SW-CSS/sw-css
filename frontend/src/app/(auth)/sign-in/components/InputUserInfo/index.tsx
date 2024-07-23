'use client';

import { useRouter } from 'next/navigation';

import { InputFixedText, Input, InputLabel, InputWrapper, SignButton } from '@/app/(auth)/styled';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { signIn } from '@/store/auth.slice';

const InputUserInfo = () => {
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
        uid: 202055558,
        isModerator: true,
      }),
    );
    setTimeout(() => {
      router.refresh();
    }, 0);
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlFor="id">아이디(이메일)</InputLabel>
        <Input id="id" placeholder="아이디 입력" />
        <InputFixedText>@pusan.ac.kr</InputFixedText>
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <Input id="password" placeholder="비밀번호 입력" />
      </InputWrapper>
      <SignButton type="button" onClick={handleSignInClick}>
        로그인
      </SignButton>
    </>
  );
};

export default InputUserInfo;
