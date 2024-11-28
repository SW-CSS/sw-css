import PageTitle from '@/components/common/PageTitle';
import AuthFindPageTabButton from '@/components/ui/auth/AuthFindPageTabButton';

import FindFooter from '../components/FindFooter';

const Page = () => (
  <main className="mx-auto w-sign max-w-full pb-10 pt-20 lg:pt-28">
    <div className="flex w-full flex-col items-center gap-10 p-5">
      <PageTitle title="아이디/비밀번호 찾기" description="아이디 또는 비밀번호가 생각나지 않나요?" />
      <AuthFindPageTabButton />
      <div className="flex w-full flex-col items-center gap-5">
        <span className="text-center font-semibold">
          아이디는 부산대 메일이며,
          <br /> 학생지원시스템에서 확인하실 수 있습니다.
        </span>
        <a
          href="https://e-onestop.pusan.ac.kr/"
          className="w-fit rounded-md border-[1px] border-black px-4 py-2 font-semibold"
        >
          학생지원시스템 바로가기
        </a>
        <span className="pb-5 text-sm text-comment">
          ※ 부산대 메일이 없다면{' '}
          <a href="https://webmail.pusan.ac.kr/" className="underline-offset-3 font-semibold underline">
            여기
          </a>
          에서 신청할 수 있습니다.
        </span>
        <hr className="w-full border-b-[1px] border-border" />
        <FindFooter />
      </div>
    </div>
  </main>
);

export default Page;
