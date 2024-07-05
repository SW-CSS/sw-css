import PageTitle from '@/app/components/PageTitle';
import TabButton from '@/components/TabButton';

import FindForm from './components/FindForm';
import FindFooter from '../components/FindFooter';

const findTabs = [
  { name: '아이디 찾기', url: '/find-id' },
  { name: '비밀번호 찾기', url: '/find-password' },
];

const Page = () => (
  <main className="mx-auto w-sign max-w-full pb-10 pt-20 lg:pt-28">
    <div className="flex w-full flex-col gap-10 p-5">
      <PageTitle
        title="아이디/비밀번호 찾기"
        description="회원가입시 입력한 이메일 주소로 진행해 주시기 바랍니다."
        urlText=""
        url=""
      />
      <TabButton tabs={findTabs} />
      <FindForm />
      <FindFooter />
    </div>
  </main>
);

export default Page;
