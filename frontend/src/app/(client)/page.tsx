import HomeAnnouncement from '@/components/ui/home/HomeAnnouncement';
import HomeExternalLink from '@/components/ui/home/HomeExternalLink';
import HomeMilestone from '@/components/ui/home/HomeMilestone';
import HomePnuLink from '@/components/ui/home/HomePnuLink';
import HomeTeamBuilding from '@/components/ui/home/HomeTeamBuilding';

const Page = () => (
  <div className="mx-auto flex max-w-client-max flex-col gap-10 px-10 pb-12 pt-12 lg:pt-20">
    <div className="flex flex-col md:flex-row md:gap-3">
      <div className="mt-10 w-full shrink-0 p-3 md:w-[380px] lg:w-[500px]">
        <HomeMilestone />
      </div>
      <div className="mt-10 w-full min-w-0 grow p-3">
        <HomeAnnouncement />
      </div>
    </div>
    <div className="w-full p-3">
      <HomeExternalLink />
    </div>
    {/* TODO: 팀빌딩 구현 완료 되면 주석 풀기 */}
    {/* <div className='w-full p-3'>
      <HomeTeamBuilding />
    </div> */}
    <div className="w-full p-3">
      <HomePnuLink />
    </div>
  </div>
);

export default Page;
