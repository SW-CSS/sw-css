/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import MilestoneGroupLabel from '@/components/MilestoneGroupLabel';
import { MilestoneGroup, MilestoneHistoryStatus } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneHistoriesOfStudentQuery } from '@/lib/hooks/useApi';
import { convertMilestoneGroup } from '@/lib/utils/utils';
import { Period } from '@/types/common';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

interface MilestoneHistoryTableProps {
  searchFilterPeriod: Period;
  pageNumber: number;
  pageSize: number;
}

const MilestoneHistoryTable = ({ searchFilterPeriod, pageNumber, pageSize }: MilestoneHistoryTableProps) => {
  const auth = useAppSelector((state) => state.auth).value;
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudentQuery(
    auth.uid,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
    MilestoneHistoryStatus.APPROVED,
    MilestoneHistorySortCriteria.ACTIVATED_AT,
    SortDirection.DESC,
    pageNumber,
    pageSize,
  );
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="flex border-b border-border text-center">
          <th className="flex-grow p-[10px]">활동명</th>
          <th className="w-20 p-[10px]">역량 구분</th>
          <th className="w-20 p-[10px]">획득 점수</th>
          <th className="w-[112px] p-[10px]">활동일</th>
        </tr>
      </thead>
      <tbody className="border-y-2 border-border text-sm">
        {milestoneHistoriesOfStudent?.content.map((milestoneHistory) => (
          <tr key={milestoneHistory.id} className="flex border-b border-border text-center">
            <td className="max-w-[calc(100%-273px)] flex-grow p-[10px] text-left">{milestoneHistory.description}</td>
            <td className="w-20 p-[10px]">
              <MilestoneGroupLabel group={milestoneHistory.milestone.categoryGroup} />
            </td>
            <td className="w-20 p-[10px]">{milestoneHistory.milestone.score * milestoneHistory.count}</td>
            <td className="w-[112px] p-[10px]">{milestoneHistory.activatedAt.slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MilestoneHistoryTable;
