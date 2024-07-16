/* eslint-disable max-len */
import { MilestoneGroup, MilestoneHistoryStatus } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneHistoriesOfStudentQuery } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

const compareByActivateDateAsc = (a: MilestoneHistoryOfStudentResponseDto, b: MilestoneHistoryOfStudentResponseDto) => {
  if (a.activatedAt > b.activatedAt) return 1;
  return -1;
};

const getLabelText = (group: string) => {
  switch (group) {
    case MilestoneGroup.ACTIVITY:
      return '실전적';
    case MilestoneGroup.GLOBAL:
      return '글로벌';
    case MilestoneGroup.COMMUNITY:
      return '커뮤니티';
    default:
      return '기타';
  }
};

interface MilestoneHistoryTableProps {
  searchFilterPeriod: Period;
  page: number;
  size: number;
}

const MilestoneHistoryTable = ({ searchFilterPeriod, page, size }: MilestoneHistoryTableProps) => {
  const auth = useAppSelector((state) => state.auth).value;
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudentQuery(
    auth.uid,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
    MilestoneHistoryStatus.APPROVED,
    MilestoneHistorySortCriteria.ACTIVATED_AT,
    SortDirection.DESC,
    page,
    size,
  );
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr className="flex border-b border-border text-center">
          <th className="flex-grow p-[10px]">활동명</th>
          <th className="w-20 p-[10px]">역량 구분</th>
          <th className="w-20 p-[10px]">획득 점수</th>
          <th className="w-[112px] p-[10px]">활동일</th>
        </tr>
      </thead>
      <tbody className="border-y-2 border-border text-sm">
        {milestoneHistoriesOfStudent?.map((milestoneHistory) => (
          <tr key={milestoneHistory.id} className="flex border-b border-border text-center">
            <td className="max-w-[calc(100%-273px)] flex-grow p-[10px] text-left">{milestoneHistory.description}</td>
            <td className="w-20 p-[10px]">
              <span
                className={`rounded-sm px-2 py-[2px] text-xs ${milestoneHistory.milestone.categoryGroup === MilestoneGroup.ACTIVITY && 'bg-milestone-blue-light text-milestone-blue-dark'} ${milestoneHistory.milestone.categoryGroup === MilestoneGroup.GLOBAL && 'bg-milestone-green-light text-milestone-green-dark'} ${milestoneHistory.milestone.categoryGroup === MilestoneGroup.COMMUNITY && 'bg-milestone-purple-light text-milestone-green-dark'} `}
              >
                {getLabelText(milestoneHistory.milestone.categoryGroup)}
              </span>
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
