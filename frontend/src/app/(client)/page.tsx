import HomeAnnouncement from '@/components/ui/home/HomeAnnouncement';
import HomeExternalLink from '@/components/ui/home/HomeExternalLink';
import HomeMilestone from '@/components/ui/home/HomeMilestone';
import HomePnuLink from '@/components/ui/home/HomePnuLink';
import HomeTeamBuilding from '@/components/ui/home/HomeTeamBuilding';
import { AnnouncementContent, ContentWrapper, MilestoneWrapper, FlexWrapper, MainPageWrapper } from './styled';

const Page = () => (
  <MainPageWrapper>
    <FlexWrapper>
      <MilestoneWrapper>
        <HomeMilestone />
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
