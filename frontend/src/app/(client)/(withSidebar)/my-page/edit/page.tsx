import Title from '@/components/Title';

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <Title title="내 정보 수정" />

      <div className="flex h-40 w-full items-center justify-center text-comment">개발 중인 기능입니다.</div>
    </div>
  );
};

export default Page;
