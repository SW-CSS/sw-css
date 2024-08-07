import Link from 'next/link';

import PageTitle from '@/app/components/PageTitle';

import MilestoneHistoryTable from './components/MilestoneHistoryTable';

const Page = async () => (
  <div className="rounded-sm bg-white p-5">
    <div className="mb-10 flex items-center justify-between">
      <PageTitle title="실적 등록" description="나의 마일스톤 실적 결과 등록" urlText="" url="" />
      <Link href="/my-page/milestone/register/write" className="rounded-sm bg-primary-main px-5 py-1 text-white">
        실적 등록
      </Link>
    </div>
    <MilestoneHistoryTable />
  </div>
);

export default Page;
