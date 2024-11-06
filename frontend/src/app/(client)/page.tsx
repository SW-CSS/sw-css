import Announcement from './components/Announcement';
import ExternalLink from './components/ExternalLink';
import Milestone from './components/Milestone';
import PnuLink from './components/PnuLink';
import TeamBuildings from './components/TeamBuildings';
import { AnnouncementContent, ContentWrapper, MilestoneWrapper, FlexWrapper, MainPageWrapper } from './styled';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <MilestoneWrapper>
        <Milestone />
      </MilestoneWrapper>
      <AnnouncementContent>
        <Announcement />
      </AnnouncementContent>
    </FlexWrapper>
    <ContentWrapper>
      <ExternalLink />
    </ContentWrapper>
    {/* TODO: 팀빌딩 구현 완료 되면 주석 풀기 */}
    {/* <ContentWrapper>
      <TeamBuildings />
    </ContentWrapper> */}
    <ContentWrapper>
      <PnuLink />
    </ContentWrapper>
  </MainPageWrapper>
);

export default Page;
