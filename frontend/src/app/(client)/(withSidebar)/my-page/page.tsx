import PageSubTitle from '@/components/common/PageSubTitle';

import MilestoneSection from './components/MilestoneSection';
import StudentInfoSection from './components/StudentInfoSection';
import MyPageMilestoneHistory from '@/components/ui/my-page/MyPageMilestoneHistory';

const Page = () => (
  <div className="flex w-full flex-wrap gap-5">
    <StudentInfoSection />
    <MilestoneSection />
    <MyPageMilestoneHistory />
    <div className="flex-grow rounded-sm bg-white p-5">
      <PageSubTitle title="내가 쓴 팀빌딩 글" urlText="전체보기" url="/my-page/team-building" />
      <div className="p-20 text-center text-comment">아직 준비중인 기능이에요.</div>
    </div>
  </div>
);
export default Page;
