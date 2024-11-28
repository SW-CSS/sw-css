import Link from 'next/link';

import PageTitle from '@/components/common/PageTitle';
import AuthSignInForm from '@/components/ui/auth/AuthSignInForm';

export default function SignInPage() {
  return (
    <div className="max-w-sign-max m-auto pb-10 pt-12 lg:pt-20">
      <div className="flex flex-col gap-5 p-5 sm:p-[70px_20px_20px]">
        <div className="flex flex-col">
          <PageTitle title="로그인" description="PNU SW역량시스템 첫 사용시 회원가입이 필요합니다." />
        </div>
        <AuthSignInForm />
        <div className="grid grid-cols-2 text-center text-xs text-comment">
          <div className="relative z-0 after:absolute after:bottom-1/4 after:right-0 after:h-1/2 after:border-r after:border-comment after:content-['']">
            <Link href="/find-id">아이디</Link> / <Link href="/find-password">비밀번호</Link> 찾기
          </div>
          <div>
            처음오셨나요? <Link href="/sign-up">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
