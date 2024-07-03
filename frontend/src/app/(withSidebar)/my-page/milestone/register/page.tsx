import PageTitle from '@/app/components/PageTitle';
import { getMilestoneHistoriesOfStudent } from '@/lib/api/server.api';

const Page = async () => {
  const milestoneHistories = await getMilestoneHistoriesOfStudent({
    memberId: 202055558,
  });
  console.log(milestoneHistories);

  return (
    <div className="">
      <PageTitle title="실적 등록" description="나의 마일스톤 실적 결과 등록" urlText="" url="" />
      {milestoneHistories?.map((milestoneHistory) => (
        <p>{milestoneHistory.milestone.score * milestoneHistory.count}</p>
      ))}
    </div>
  );
};

export default Page;
