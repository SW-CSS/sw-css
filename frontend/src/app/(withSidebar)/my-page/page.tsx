import SubTitle from '@/components/SubTitle';

import MilestoneSection from './components/MilestoneSection';
import StudentInfoSection from './components/StudentInfoSection';

const Page = () => (
  <div className="flex w-full flex-wrap gap-5">
    <StudentInfoSection />
    <div className="w-[430px] rounded-sm bg-white p-5">
      <SubTitle title="내 마일스톤 현황" />
    </div>
    <MilestoneSection />
    <div className="w-[280px] rounded-sm bg-white p-5">
      <SubTitle title="실적 등록" urlText="등록하기" url="/my-page/milestone/register" />
    </div>
    <div className="flex-grow rounded-sm bg-white p-5">
      <SubTitle title="내가 쓴 팀빌딩 글" urlText="전체보기" url="/my-page/team-building" />
    </div>
  </div>
);
export default Page;
