import PageTitle from '@/components/common/PageTitle';
import AuthFindPageTabButton from '@/components/ui/auth/AuthFindPageTabButton';
import AuthFindPageFooter from '@/components/ui/auth/AuthFindPageFooter';

import FindForm from './components/FindForm';

const Page = () => (
  <main className="mx-auto w-sign max-w-full pb-10 pt-20 lg:pt-28">
    <div className="flex w-full flex-col gap-10 p-5">
      <PageTitle title="아이디/비밀번호 찾기" description="회원가입시 입력한 이메일 주소로 진행해 주시기 바랍니다." />
      <AuthFindPageTabButton />
      <FindForm />
      <AuthFindPageFooter />
    </div>
  </main>
);

export default Page;
