import Milestone from './components/Milestone';
import { AnnouncementContent, ContentWrapper, MilestoneWrapper, FlexWrapper, MainPageWrapper } from './styled';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <MilestoneWrapper style={{ border: '2px solid pink' }}>
        <Milestone />
      </MilestoneWrapper>
      <AnnouncementContent style={{ border: '2px solid pink' }}>announcement</AnnouncementContent>
    </FlexWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>linker</ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>team building</ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>pnu linker</ContentWrapper>
  </MainPageWrapper>
);

export default Page;
