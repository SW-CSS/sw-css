import MilestoneCircleChart from '@/components/ui/milestone/MilestoneCircleChart';
import MilestoneOverviewTable from '@/components/ui/milestone/MilestoneOverviewTable';
import GoPageIcon from '@/components/ui/home/GoPageIcon';
import HomeSignIn from '@/components/ui/home/HomeSignIn';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';

import { getMyMilestoneHistory } from '@/lib/api/server.api';
import { DateTime } from 'luxon';
import { MilestoneOverviewScore } from '@/types/milestone';
import { initialMilestoneOverview } from '@/data/milestone';

export default async function HomeMilestone() {
  const auth: AuthSliceState = getAuthFromCookie();

  const milestoneOverviewScore = await getMilestoneOverviewScore(auth.id);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">나의 마일스톤</p>
          <p className="cursor-default text-sm text-comment">나의 마일스톤 내역을 확인할 수 있어요.</p>
        </div>
        {auth.isAuth && <GoPageIcon name="전체보기" url="/my-page/milestone" />}
      </div>
      {auth.isAuth && (
        <div className="m-3 flex items-center justify-around gap-5">
          <MilestoneCircleChart chartSize={120} fontSize="sm" milestoneOverviewScore={milestoneOverviewScore} />
          <MilestoneOverviewTable milestoneOverviewScore={milestoneOverviewScore} />
        </div>
      )}
      {!auth.isAuth && <HomeSignIn />}
    </div>
  );
}

async function getMilestoneScores(studentId: number) {
  const auth = getAuthFromCookie();
  const startDate = DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd');
  const endDate = DateTime.now().toFormat('yyyy-MM-dd');
  try {
    const milestoneScores = await getMyMilestoneHistory(auth.token, studentId, startDate, endDate);
    return milestoneScores;
  } catch (err) {
    // TODO: server api error handling
  }
  return null;
}

async function getMilestoneOverviewScore(studentId: number) {
  const milestoneScores = await getMilestoneScores(studentId);
  const milestoneOverviewScore = milestoneScores?.reduce<MilestoneOverviewScore>(
    (acc, cur) => {
      const key = `${cur.group.toLowerCase()}Score` as keyof MilestoneOverviewScore;
      acc[key] += cur.score;
      acc.totalScore += cur.score;
      return acc;
    },
    { ...initialMilestoneOverview },
  );
  return milestoneOverviewScore || initialMilestoneOverview;
}
