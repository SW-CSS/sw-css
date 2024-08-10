/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import MilestoneHistoryStatusLabel from '@/app/(withSidebar)/my-page/components/MilestoneHistoryStatusLabel';
import { getMilestoneHistoriesOfStudent } from '@/lib/api/server.api';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import MilestoneHistoryDeleteButton from '../MilestoneHistoryDeleteButton';

const MilestoneHistoryTable = async () => {
  const auth = getAuthFromCookie();
  const milestoneHistories = await getMilestoneHistoriesOfStudent(
    auth.uid,
    undefined,
    undefined,
    undefined,
    MilestoneHistorySortCriteria.CREATED_AT,
    SortDirection.DESC,
  );

  return (
    <table className="w-full text-sm">
      <thead className="font-bold">
        <tr className="text-center">
          <td className="min-w-[2em] p-2">No</td>
          <td className="w-full p-2">제목</td>
          <td className="min-w-[3em] p-2">점수</td>
          <td className="min-w-[10em] p-2">활동일</td>
          <td className="min-w-[10em] p-2">등록일</td>
          <td className="min-w-[6em] p-2">진행 상황</td>
          <td className="min-w-[6em] p-2">처리</td>
        </tr>
      </thead>
      <tbody className="border-y text-center">
        {milestoneHistories?.content.map((milestoneHistory, index) => (
          <tr className="border-b border-border p-2">
            <td className="p-2">{index + 1} </td>
            <td className="p-2 text-left">{milestoneHistory.description}</td>
            <td className="p-2">{milestoneHistory.milestone.score * milestoneHistory.count}</td>
            <td className="p-2">{milestoneHistory.activatedAt}</td>
            <td className="p-2">{milestoneHistory.createdAt.slice(0, 10)}</td>
            <td className="p-2" align="center">
              <MilestoneHistoryStatusLabel
                status={milestoneHistory.status}
                rejectReason={milestoneHistory.rejectReason}
              />
            </td>
            <td className="p-2">
              <MilestoneHistoryDeleteButton historyId={milestoneHistory.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MilestoneHistoryTable;
