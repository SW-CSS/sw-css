/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable no-alert */

'use client';

import { useQueryClient } from '@tanstack/react-query';

import MilestoneHistoryStatusLabel from '@/app/(withSidebar)/my-page/components/MilestoneHistoryStatusLabel';
import { QueryKeys } from '@/data/queryKey';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneHistoriesOfStudentQuery, useMilestoneHistoryDeleteMutation } from '@/lib/hooks/useApi';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

const compareByCreatedAtDesc = (a: MilestoneHistoryOfStudentResponseDto, b: MilestoneHistoryOfStudentResponseDto) => {
  if (a.createdAt < b.createdAt) return 1;
  return -1;
};

const MilestoneHistoryTable = () => {
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.auth).value;
  const { data: milestoneHistories } = useMilestoneHistoriesOfStudentQuery(
    auth.uid,
    MilestoneHistorySortCriteria.CREATED_AT,
    SortDirection.DESC,
  );
  const { mutate: delteMilestoneHistory } = useMilestoneHistoryDeleteMutation();
  const handleHistoryDeleteButtonClick = (id: number) => {
    if (window.confirm('정말로 실적 내역을 삭제하시겠습니까?')) {
      delteMilestoneHistory(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(
            QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(
              auth.uid,
              MilestoneHistorySortCriteria.CREATED_AT,
              SortDirection.DESC,
            ),
          );
        },
      });
    }
  };

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
        {milestoneHistories?.sort(compareByCreatedAtDesc).map((milestoneHistory, index) => (
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
              <button
                type="button"
                onClick={() => {
                  handleHistoryDeleteButtonClick(milestoneHistory.id);
                }}
                className="rounded-sm bg-red-400 px-4 py-2 text-white"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MilestoneHistoryTable;
