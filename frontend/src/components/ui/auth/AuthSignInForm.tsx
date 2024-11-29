'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { useSignInMutation } from '@/lib/hooks/useApi';
import { signIn } from '@/store/auth.slice';

export default function AuthSignInForm() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { mutate: signInMutation } = useSignInMutation();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth).value;

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

  useEffect(() => {
    if (auth.isAuth) router.push('/');
  }, [auth, router]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative flex flex-col">
        <label className="text-sm font-semibold" htmlFor="email">
          아이디(이메일)
        </label>
        <input
          className="rounded-sm border border-border p-2 outline-none placeholder:italic placeholder:text-border"
          id="email"
          placeholder="아이디 입력"
          value={userInfo.email}
          onChange={handleInputChange}
        />
        <div className="absolute right-2.5 translate-y-1/2 text-sm text-comment" style={{ bottom: 'calc(50% - 10px)' }}>
          @pusan.ac.kr
        </div>
      </div>
      <div className="relative flex flex-col">
        <label className="text-sm font-semibold" htmlFor="password">
          비밀번호
        </label>
        <input
          className="rounded-sm border border-border p-2 outline-none placeholder:italic placeholder:text-border"
          type="password"
          id="password"
          placeholder="비밀번호 입력"
          value={userInfo.password}
          onChange={handleInputChange}
        />
      </div>
      <button className="mt-4 w-full rounded-sm border-0 bg-primary-main p-2 text-white" type="submit">
        로그인
      </button>
    </form>
  );
}
