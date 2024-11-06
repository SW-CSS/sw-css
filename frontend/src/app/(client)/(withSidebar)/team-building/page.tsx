import PageTitle from '@/components2/common/PageTitle';

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <PageTitle title="팀 빌딩" />

      <div className="flex h-40 w-full items-center justify-center text-comment">개발 중인 기능입니다.</div>
    </div>
  );
};

export default Page;
