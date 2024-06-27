'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch } from '@/lib/hooks/redux';
import { signIn } from '@/store/auth.slice';

import { FixedEmail, InputID, InputPW, SignInButton } from './styled';

const InputUserInfo = () => {
  const [userID, setUserID] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');

  const router = useRouter();
  const dispatch = useAppDispatch();

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
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', position: 'relative' }}>
        <InputID placeholder="아이디 입력" value={userID} onChange={(e) => setUserID(e.target.value)} />
        <InputPW
          placeholder="비밀번호 입력"
          type="password"
          value={userPW}
          onChange={(e) => setUserPW(e.target.value)}
        />
        <FixedEmail>@pusan.ac.kr</FixedEmail>
      </div>
      <SignInButton type="button" onClick={handleSignInClick}>
        로그인
      </SignInButton>
    </div>
  );
};

export default InputUserInfo;
