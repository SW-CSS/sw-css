/* eslint-disable max-len */
/* eslint-disable no-alert */

'use client';

import { useQueryClient } from '@tanstack/react-query';
import { VscInfo } from 'react-icons/vsc';

import { MilestoneHistoryStatus } from '@/data/milestone';
import { QueryKeys } from '@/data/queryKey';
import { useMilestoneHistoriesOfStudentQuery, useMilestoneHistoryDeleteMutation } from '@/lib/hooks/useApi';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';

const compareByCreatedAtDesc = (a: MilestoneHistoryOfStudentResponseDto, b: MilestoneHistoryOfStudentResponseDto) => {
  if (a.createdAt < b.createdAt) return 1;
  return -1;
};

const MilestoneHistoryTable = () => {
  const queryClient = useQueryClient();
  const { data: milestoneHistories } = useMilestoneHistoriesOfStudentQuery(202055558);
  const { mutate: delteMilestoneHistory } = useMilestoneHistoryDeleteMutation();

  const getStatusLabel = (status: string, rejectReason: string | null) => {
    switch (status) {
      case MilestoneHistoryStatus.APPROVED:
        return <span className="rounded-sm bg-green-100 px-2 py-1 text-green-500">승인</span>;
      case MilestoneHistoryStatus.REJECTED:
        return (
          <div className="relative mx-auto flex w-fit gap-1 rounded-sm bg-red-100 px-2 py-1 text-red-500">
            <span>반려</span>
            <VscInfo className="peer h-[14px] w-[14px]" />
            <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-[calc(100%+4px)] rounded border bg-white p-2 peer-hover:block">
              {rejectReason}
            </div>
          </div>
        );
      case MilestoneHistoryStatus.PENDING:
        return <span className="rounded-sm bg-gray-100 px-2 py-1 text-gray-500">처리중</span>;
      default:
        return '잘못된 상태';
    }
  };

  const handleHistoryDeleteButtonClick = (id: number) => {
    if (window.confirm('정말로 실적 내역을 삭제하시겠습니까?')) {
      delteMilestoneHistory(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(202055558));
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
            <td className="p-2">{getStatusLabel(milestoneHistory.status, milestoneHistory.rejectReason)}</td>
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
