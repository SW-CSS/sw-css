import MilestoneChart from '@/components/MilestoneChart';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';

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
      {auth.isAuth && <MilestoneChart />}
      {!auth.isAuth && <SignIn />}
    </div>
  );
};

export default Milestone;
