import Link from 'next/link';

import { MilestoneHistoryStatus } from '@/data/milestone';
import { convertMilestoneHistoryStatus } from '@/lib/utils/utils';
import { MilestoneHistoryDto } from '@/types/common.dto';

interface AdminMilestoneTableProps {
  histories: MilestoneHistoryDto[];
}

export default function AdminMilestoneTable({ histories }: AdminMilestoneTableProps) {
  const getHistoryStatus = (status: string) => {
    switch (status) {
      case MilestoneHistoryStatus.PENDING:
        return <span className="text-lg font-bold text-admin-comment">{convertMilestoneHistoryStatus(status)}</span>;
      case MilestoneHistoryStatus.APPROVED:
        return (
          <span className="text-lg font-bold text-admin-primary-light">{convertMilestoneHistoryStatus(status)}</span>
        );
      case MilestoneHistoryStatus.REJECTED:
        return (
          <span className="text-lg font-bold text-admin-semantic-error-main">
            {convertMilestoneHistoryStatus(status)}
          </span>
        );
      default:
        return convertMilestoneHistoryStatus(status);
    }
  };

  return (
    <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
      <thead className="border-y-2 border-admin-border [&_th]:p-2">
        <tr>
          <th className="w-[60px]">No.</th>
          <th className="w-[60px]">이름</th>
          <th className="w-[80px]">학번</th>
          <th className="w-[100px]">활동 코드</th>
          <th className="w-full">활동명</th>
          <th className="w-[80px]">건당 점수</th>
          <th className="w-[80px]">활동 횟수(건)</th>
          <th className="w-[100px]">활동일</th>
          <th className="w-[100px]">등록일</th>
          <th className="w-[100px]">승인 여부</th>
        </tr>
      </thead>
      <tbody>
        {histories?.map((history) => {
          const linkHref = `/admin/milestone/${history.id}`;
          return (
            <tr
              key={history.id}
              className="cursor-pointer border-b-[1px] border-admin-border hover:bg-admin-background-light [&_td]:h-[50px] [&_td]:break-keep"
            >
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.id}
                </Link>
              </td>
              <td className="font-semibold">
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.student.name}
                </Link>
              </td>
              <td className="font-semibold">
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.student.id}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.milestone.id}
                </Link>
              </td>
              <td className="text-left">
                <Link href={linkHref} className="flex h-full w-full items-center justify-start">
                  {history.description}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.milestone.score}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.count}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.activatedAt}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {history.createdAt.slice(0, 10)}
                </Link>
              </td>
              <td>
                <Link href={linkHref} className="flex h-full w-full items-center justify-center">
                  {getHistoryStatus(history.status)}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
