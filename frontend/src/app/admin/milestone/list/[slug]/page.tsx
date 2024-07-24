import Link from 'next/link';

import MilestoneGroupLabel from '@/components/MilestoneGroupLabel';
import { getMilestoneHistory } from '@/lib/api/server.api';

interface MilestoneHistoryDetailPageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params: { slug } }: MilestoneHistoryDetailPageProps) => {
  const history = await getMilestoneHistory(slug);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full gap-4">
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-bold">학생 정보</p>
          <div className="my-4 flex flex-grow flex-col gap-2 rounded-md border border-border p-2 px-4">
            <p className="flex">
              <span className="w-[3em]">이름</span>
              <span className="flex-grow">{history.student.name}</span>
            </p>
            <p className="flex">
              <span className="w-[3em]">학번</span>
              <span className="flex-grow">{history.student.id}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-bold">활동 정보</p>
          <div className="my-4 flex flex-grow flex-col gap-2 rounded-md border border-border p-2 px-4">
            <p className="flex">
              <span className="w-[6em]">활동 코드</span>
              <span className="flex-grow">{history.milestone.id}</span>
            </p>
            <p className="flex">
              <span className="w-[6em]">이름</span>
              <span className="flex-grow">
                {history.milestone.categoryName} -
                {history.milestone.categoryName !== history.milestone.name && (
                  <span className="pl-1 text-admin-primary-light">{history.milestone.name}</span>
                )}
              </span>
            </p>
            <p className="flex">
              <span className="w-[6em]">유형</span>
              <span className="flex-grow">
                <MilestoneGroupLabel group={history.milestone.categoryGroup} />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-bold">실적 정보</p>
          <div className="my-4 flex flex-grow flex-col gap-2 rounded-md border border-border p-2 px-4">
            <p className="flex">
              <span className="w-[8em]">활동 상세</span>
              <span className="flex-grow">{history.description}</span>
            </p>
            <p className="flex">
              <span className="w-[8em]">활동 점수(건당)</span>
              <span className="flex-grow">{history.milestone.score}점</span>
            </p>
            <p className="flex">
              <span className="w-[8em]">활동 횟수</span>
              <span className="flex-grow">{history.count}건</span>
            </p>
            <p className="flex">
              <span className="w-[8em]">활동일</span>
              <span className="flex-grow">{history.activatedAt}</span>
            </p>
            <p className="flex">
              <span className="w-[8em]">실적 등록일</span>
              <span className="flex-grow">{history.createdAt.slice(0, 10)}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-lg font-bold">증빙자료 미리보기</p>
          <div className="my-4 flex flex-grow flex-col gap-2 rounded-md border border-border p-2 px-4">
            파일 미리보기
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          href="/admin/milestone/list"
          className="rounded-sm border-2 border-border px-4 py-2 hover:bg-admin-background-light"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
};

export default Page;
