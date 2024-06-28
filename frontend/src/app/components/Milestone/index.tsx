import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { milestoneSummaryInfo } from '@/mocks/milestone';
import { AuthSliceState } from '@/store/auth.slice';

import { MilestoneChartWrapper } from './styled';
import GoPageIcon from '../GoPageIcon';
import SignIn from '../SignIn';
import { Description, Title, TitleContent, TitleWrapper } from '../styled';

const Milestone = () => {
  const auth: AuthSliceState = getAuthFromCookie();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleWrapper style={{ justifyContent: 'space-between' }}>
        <TitleContent>
          <Title>나의 마일스톤</Title>
          <Description>나의 마일스톤 내역을 확인할 수 있어요.</Description>
        </TitleContent>
        {/* TODO: url 자신의 마일스톤으로 이동하도록 수정하기 */}
        {auth.isAuth && <GoPageIcon name="전체보기" url="/" />}
      </TitleWrapper>
      {auth.isAuth && (
        <MilestoneChartWrapper>
          <MilestoneChart
            practicalScore={milestoneSummaryInfo.practicalScore}
            globalScore={milestoneSummaryInfo.globalScore}
            communicationScore={milestoneSummaryInfo.communicationScore}
            totalScore={milestoneSummaryInfo.totalScore}
          />
          <MilestoneTable
            practicalScore={milestoneSummaryInfo.practicalScore}
            globalScore={milestoneSummaryInfo.globalScore}
            communicationScore={milestoneSummaryInfo.communicationScore}
            totalScore={milestoneSummaryInfo.totalScore}
          />
        </MilestoneChartWrapper>
      )}
      {!auth.isAuth && <SignIn />}
    </div>
  );
};

export default Milestone;
