import { usePathname } from 'next/navigation';

import Pagination from '@/components/common/Pagination';
import MilestoneGroupLabel from '@/components/ui/milestone/MilestoneGroupLabel';
import { MilestoneHistoryStatus } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneHistoriesOfStudentQuery } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

interface MilestoneHistoryTableProps {
  searchFilterPeriod: Period;
  pageNumber: number;
  pageSize: number;
}

export default function MilestoneHistoryTable({
  searchFilterPeriod,
  pageNumber,
  pageSize,
}: MilestoneHistoryTableProps) {
  const pathname = usePathname();
  const auth = useAppSelector((state) => state.auth).value;
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudentQuery(
    auth.id,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
    MilestoneHistoryStatus.APPROVED,
    MilestoneHistorySortCriteria.ACTIVATED_AT,
    SortDirection.DESC,
    pageNumber - 1,
    pageSize,
  );
  return (
    <div className="flex flex-col gap-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="flex items-center border-b border-border text-center text-sm sm:text-base">
            <th className="flex-grow p-[10px]">활동명</th>
            <th className="w-16 p-1 sm:w-20 sm:p-[10px]">구분</th>
            <th className="w-16 p-1 sm:p-[10px]">점수</th>
            <th className="hidden w-[80px] p-1 sm:table-cell sm:w-[100px] sm:p-[10px]">활동일</th>
          </tr>
        </thead>
        <tbody className="border-y-2 border-border text-xs sm:text-sm">
          {milestoneHistoriesOfStudent?.content.map((milestoneHistory) => (
            <tr key={milestoneHistory.id} className="flex items-center border-b border-border text-center">
              <td className="max-w-[calc(100%-128px)] flex-grow p-[10px] text-left sm:max-w-[calc(100%-244px)]">
                {milestoneHistory.description}
              </td>
              <td className="w-16 p-1 sm:w-20 sm:p-[10px]">
                <MilestoneGroupLabel group={milestoneHistory.milestone.categoryGroup} />
              </td>
              <td className="w-16 p-1 sm:p-[10px]">{milestoneHistory.milestone.score * milestoneHistory.count}</td>
              <td className="hidden w-[100px] p-[10px] sm:table-cell">
                {milestoneHistory.activatedAt.slice(0, 10).replaceAll('-', '.')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNumber}
        pageSize={pageSize}
        totalItems={milestoneHistoriesOfStudent?.totalElements ?? 0}
        pathname={pathname}
      />
    </div>
  );
}
