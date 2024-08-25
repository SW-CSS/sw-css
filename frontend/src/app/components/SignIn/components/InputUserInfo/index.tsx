'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch } from '@/lib/hooks/redux';
import { signIn } from '@/store/auth.slice';

import { FixedEmail, InputID, InputPW, SignInButton } from './styled';
import { useSignInMutation } from '@/lib/hooks/useApi';
import { toast } from 'react-toastify';

const InputUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const { mutate: signInMutation } = useSignInMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

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
        router.refresh();
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', position: 'relative' }}>
        <InputID placeholder="아이디 입력" id="email" value={userInfo.email} onChange={handleInputChange} />
        <InputPW
          placeholder="비밀번호 입력"
          type="password"
          id="password"
          value={userInfo.password}
          onChange={handleInputChange}
        />
        <FixedEmail>@pusan.ac.kr</FixedEmail>
      </div>
      <SignInButton type="submit">로그인</SignInButton>
    </form>
  );
};

export default InputUserInfo;
