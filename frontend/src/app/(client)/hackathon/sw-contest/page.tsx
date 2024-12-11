import PageTitle from '@/components/common/PageTitle';

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <PageTitle title="SW문제해결 경진대회" description="구글 사이트에 게시된 학생들의 작품을 감상해보세요!" />
      <div className="h-0 w-full border border-border" />

      <div className="flex h-40 w-full items-center justify-center text-comment">개발 중인 기능입니다.</div>
    </div>
  );
};

export default Page;
