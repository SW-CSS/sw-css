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
    <ContentWrapper>
      <TeamBuildings />
    </ContentWrapper>
    <ContentWrapper>
      <PnuLink />
    </ContentWrapper>
  </MainPageWrapper>
);

export default Page;
