import HomeAnnouncement from '@/components/ui/home/HomeAnnouncement';
import HomeTeamBuilding from '@/components/ui/home/HomeTeamBuilding';
import Milestone from './components/Milestone';
import HomePnuLink from '@/components/ui/home/HomePnuLink';
import { AnnouncementContent, ContentWrapper, MilestoneWrapper, FlexWrapper, MainPageWrapper } from './styled';
import HomeExternalLink from '@/components/ui/home/HomeExternalLink';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <MilestoneWrapper>
        <Milestone />
      </MilestoneWrapper>
      <AnnouncementContent>
        <HomeAnnouncement />
      </AnnouncementContent>
    </FlexWrapper>
    <ContentWrapper>
      <HomeExternalLink />
    </ContentWrapper>
    {/* TODO: 팀빌딩 구현 완료 되면 주석 풀기 */}
    {/* <ContentWrapper>
      <HomeTeamBuilding />
    </ContentWrapper> */}
    <ContentWrapper>
      <HomePnuLink />
    </ContentWrapper>
  </MainPageWrapper>
);

export default Page;
