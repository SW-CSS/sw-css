import SubTitle from '@/components/SubTitle';

const Page = () => (
  <div className="flex w-full flex-wrap gap-5">
    <div className="w-[530px] rounded-sm bg-white p-5">
      <SubTitle title="내 정보" urlText="수정" url="/my-page/edit" />
    </div>
    <div className="w-[380px] rounded-sm bg-white p-5">
      <SubTitle title="내 마일스톤 현황" />
    </div>
    <div className="w-[630px] rounded-sm bg-white p-5">
      <SubTitle title="내 마일스톤 상세" urlText="전체보기" url="/my-page/milestone" />
    </div>
    <div className="w-[280px] rounded-sm bg-white p-5">
      <SubTitle title="실적 등록" urlText="등록하기" url="/my-page/milestone/register" />
    </div>
    <div className="flex-grow rounded-sm bg-white p-5">
      <SubTitle title="내가 쓴 팀빌딩 글" urlText="전체보기" url="/my-page/team-building" />
    </div>
  </div>
);
export default Page;
