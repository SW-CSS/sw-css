/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import MilestoneHistoryStatusLabel from '@/app/(client)/(withSidebar)/my-page/components/MilestoneHistoryStatusLabel';
import { getMilestoneHistoriesOfStudent } from '@/lib/api/server.api';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import MilestoneHistoryDeleteButton from '../MilestoneHistoryDeleteButton';
import Pagination from '@/components/common/Pagination';
import { headers } from 'next/headers';

interface MilestoneHistoryTableProp {
  pageNumber: number;
}

const MilestoneHistoryTable = async ({ pageNumber }: MilestoneHistoryTableProp) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth = getAuthFromCookie();
  let milestoneHistories;
  try {
    milestoneHistories = await getMilestoneHistoriesOfStudent(
      auth.token,
      auth.id,
      undefined,
      undefined,
      undefined,
      MilestoneHistorySortCriteria.CREATED_AT,
      SortDirection.DESC,
      pageNumber - 1,
    );
  } catch (e) {
    // TODO: server api error handling...
  }

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full text-sm">
        <thead className="font-bold">
          <tr className="text-center">
            <td className="min-w-[2em] p-2">No</td>
            <td className="hidden w-full p-2 sm:table-cell">제목</td>
            <td className="min-w-[3em] p-2">점수</td>
            <td className="hidden min-w-[8em] p-2 sm:table-cell">활동일</td>
            <td className="hidden min-w-[8em] p-2 sm:table-cell">등록일</td>
            <td className="hidden min-w-[6em] p-2 sm:table-cell">진행 상황</td>
            <td className="hidden min-w-[6em] p-2 sm:table-cell">처리</td>
            <td className="table-cell min-w-[6em] p-2 sm:hidden">실적 내역</td>
          </tr>
        </thead>
        <tbody className="border-y text-center">
          {milestoneHistories?.content.map((milestoneHistory, index) => (
            <tr className="border-b border-border p-2">
              <td className="p-2">{index + 1} </td>
              <td className="hidden p-2 text-left sm:table-cell">{milestoneHistory.description}</td>
              <td className="p-2">{milestoneHistory.milestone.score * milestoneHistory.count}</td>
              <td className="hidden p-2 sm:table-cell">{milestoneHistory.activatedAt.replaceAll('-', '.')}</td>
              <td className="hidden p-2 sm:table-cell">
                {milestoneHistory.createdAt.slice(0, 10).replaceAll('-', '.')}
              </td>
              <td className="hidden p-2 sm:table-cell" align="center">
                <MilestoneHistoryStatusLabel
                  status={milestoneHistory.status}
                  rejectReason={milestoneHistory.rejectReason}
                />
              </td>
              <td className="hidden p-2 sm:table-cell">
                <MilestoneHistoryDeleteButton historyId={milestoneHistory.id} />
              </td>
              <td className="flex flex-col gap-1 p-2 sm:hidden">
                <div className="flex items-center justify-start gap-1">
                  <MilestoneHistoryStatusLabel
                    status={milestoneHistory.status}
                    rejectReason={milestoneHistory.rejectReason}
                  />
                  <div className="flex-grow text-left font-bold">{milestoneHistory.description}</div>
                </div>
                <div className="flex justify-between text-xs text-comment">
                  <div>활동: {milestoneHistory.activatedAt.replaceAll('-', '.')}</div>
                  <div>등록: {milestoneHistory.createdAt.slice(0, 10).replaceAll('-', '.')}</div>
                </div>
                <MilestoneHistoryDeleteButton historyId={milestoneHistory.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNumber}
        pageSize={10}
        totalItems={milestoneHistories?.totalElements ?? 0}
        pathname={pathname}
      />
    </div>
  );
};

export default MilestoneHistoryTable;
