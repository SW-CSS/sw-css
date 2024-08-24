'use client';

import { useRouter } from 'next/navigation';

import { InputFixedText, Input, InputLabel, InputWrapper, SignButton } from '@/app/(auth)/styled';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { signIn } from '@/store/auth.slice';
import { useSignInMutation } from '@/lib/hooks/useApi';
import { useState } from 'react';
import { toast } from 'react-toastify';

const InputUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { mutate: signInMutation } = useSignInMutation();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

  if (auth.isAuth) router.push('/');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInMutation(userInfo, {
      onSuccess(data, variables, context) {
        dispatch(
          signIn({
            id: data.member_id,
            token: `Bearer ${data.token}`,
            name: data.name,
            email: data.email,
            isModerator: data.is_moderator,
          }),
        );
        router.push('/');
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputWrapper>
          <InputLabel htmlFor="email">아이디(이메일)</InputLabel>
          <Input id="email" placeholder="아이디 입력" value={userInfo.email} onChange={handleInputChange} />
          <InputFixedText>@pusan.ac.kr</InputFixedText>
        </InputWrapper>
        <InputWrapper>
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={userInfo.password}
            onChange={handleInputChange}
          />
        </InputWrapper>
        <SignButton type="submit">로그인</SignButton>
      </form>
    </>
  );
};

export default InputUserInfo;
