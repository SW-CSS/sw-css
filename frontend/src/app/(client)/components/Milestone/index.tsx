import MilestoneChart from '@/components/MilestoneChart';
import MilestoneOverviewTable from '@/components2/ui/milestone/MilestoneOverviewTable';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';

import { MilestoneChartWrapper } from './styled';
import GoPageIcon from '@/components2/ui/home/GoPageIcon';
import SignIn from '../SignIn';
import { Description, Title, TitleContent, TitleWrapper } from '../styled';
import { getMyMilestoneHistory } from '@/lib/api/server.api';
import { DateTime } from 'luxon';
import { MilestoneOverviewScore } from '@/types/milestone';
import { initialMilestoneOverview } from '@/data/milestone';

const getMilestoneScores = async (studentId: number) => {
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
};

const getMilestoneOverviewScore = async (studentId: number) => {
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
};

const Milestone = async () => {
  const auth: AuthSliceState = getAuthFromCookie();

  const milestoneOverviewScore = await getMilestoneOverviewScore(auth.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleWrapper style={{ justifyContent: 'space-between' }}>
        <TitleContent>
          <Title>나의 마일스톤</Title>
          <Description>나의 마일스톤 내역을 확인할 수 있어요.</Description>
        </TitleContent>
        {auth.isAuth && <GoPageIcon name="전체보기" url="/my-page/milestone" />}
      </TitleWrapper>
      {auth.isAuth && (
        <MilestoneChartWrapper>
          <MilestoneChart chartSize={120} fontSize="sm" milestoneOverviewScore={milestoneOverviewScore} />
          <MilestoneOverviewTable milestoneOverviewScore={milestoneOverviewScore} />
        </MilestoneChartWrapper>
      )}
      {!auth.isAuth && <SignIn />}
    </div>
  );
};

export default Milestone;
