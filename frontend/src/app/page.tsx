import { AnnouncementContent, ContentWrapper, FlexContentWrapper, FlexWrapper, MainPageWrapper } from './styled';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <FlexContentWrapper style={{ border: '2px solid pink' }}>login & milestone</FlexContentWrapper>
      <AnnouncementContent style={{ border: '2px solid pink' }}>announcement</AnnouncementContent>
    </FlexWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>linker</ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>team building</ContentWrapper>
    <ContentWrapper style={{ border: '2px solid pink' }}>pnu linker</ContentWrapper>
  </MainPageWrapper>
);

export default Page;
