import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';

import { Content, Title, SubTitle, MilestoneWrapper } from './styled';

const Page = () => (
  <Content>
    <Title>마일스톤 획득 내역</Title>
    <SubTitle>전체 현황</SubTitle>
    <div style={{ display: 'flex' }}>
      <MilestoneWrapper>
        <MilestoneChart
          chartSize={180}
          fontSize="lg"
          practicalScore={0}
          globalScore={0}
          communicationScore={0}
          totalScore={0}
        />
        <MilestoneTable practicalScore={0} globalScore={0} communicationScore={0} totalScore={0} />
      </MilestoneWrapper>
    </div>
  </Content>
);

export default Page;
