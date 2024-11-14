'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch } from '@/lib/hooks/redux';
import { signIn } from '@/store/auth.slice';

import { useSignInMutation } from '@/lib/hooks/useApi';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function HomeSignIn() {
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
    <div className="mt-7 flex flex-col gap-5">
      <div className="rounded-sm bg-background-light p-2 text-center text-comment">로그인이 필요한 서비스입니다.</div>
      <form onSubmit={handleSubmit} className="flex gap-5">
        <div className="relative flex grow flex-col">
          <input
            className="min-w-[232px] rounded-sm rounded-b-none border border-border p-2 outline-none placeholder:italic placeholder:text-border"
            placeholder="아이디 입력"
            id="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <input
            className='className="min-w-[232px] placeholder:text-border" rounded-sm rounded-t-none border border-border p-2 outline-none placeholder:italic'
            placeholder="비밀번호 입력"
            type="password"
            id="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <div className="absolute right-3 top-1/4 -translate-y-1/2 text-xs text-comment">@pusan.ac.kr</div>
        </div>
        <button
          className="min-w-[70px] max-w-[110px] grow rounded-sm border-none bg-primary-main text-white"
          type="submit"
        >
          로그인
        </button>
      </form>
      <div className="grid grid-cols-2 text-center text-comment">
        <div className="relative z-0 text-xs after:absolute after:bottom-1/4 after:right-0 after:h-3/4 after:border-r after:border-r-comment after:content-['']">
          <Link className="text-xs text-comment" href="/find-id">
            아이디
          </Link>
          /
          <Link className="text-xs text-comment" href="/find-password">
            비밀번호
          </Link>
          찾기
        </div>
        <div className="text-xs">
          처음오셨나요?{' '}
          <Link className="text-xs text-comment underline" href="/sign-up">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
