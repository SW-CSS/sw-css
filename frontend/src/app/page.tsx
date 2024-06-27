import Announcement from './components/Announcement';
import ExternalLink from './components/ExternalLink';
import Milestone from './components/Milestone';
import PnuLink from './components/PnuLink';
import { AnnouncementContent, ContentWrapper, MilestoneWrapper, FlexWrapper, MainPageWrapper } from './styled';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <MilestoneWrapper style={{ border: '2px solid pink' }}>
        <Milestone />
      </MilestoneWrapper>
      <AnnouncementContent style={{ border: '2px solid pink' }}>
        <Announcement />
      </AnnouncementContent>
    </FlexWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>
      <ExternalLink />
    </ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>team building</ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>
      <PnuLink />
    </ContentWrapper>
  </MainPageWrapper>
);

export default Page;
