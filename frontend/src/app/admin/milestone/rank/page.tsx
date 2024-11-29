'use client';

import { DateTime } from 'luxon';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import AdminPagination from '@/components/common/admin/AdminPagination';
import PeriodSearchBox from '@/components/common/PeriodSearchBox';
import { MilestoneGroup } from '@/data/milestone';
import { useMilestoneHistoryScoreExcelFileQuery, useMilestoneScoresQuery } from '@/lib/hooks/useAdminApi';
import { useMilestoneQuery } from '@/lib/hooks/useApi';
import { convertMilestoneGroup } from '@/lib/utils/utils';
import { Period } from '@/types/common';

export default function MilestoneRankPage() {
  const [filterPeriod, setFilterPeriod] = useState<Period>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<Period>(filterPeriod);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get('page') || '1', 10);
  console.log(page);

  const { data: excelFile } = useMilestoneHistoryScoreExcelFileQuery(
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
  );
  const excelFileUrl = useMemo(() => {
    if (excelFile) {
      return URL.createObjectURL(excelFile);
    }
    return '';
  }, [excelFile]);
  const { data: milestoneScores } = useMilestoneScoresQuery(
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
    page - 1,
    undefined,
  );
  const { data: milestones } = useMilestoneQuery();

  const handleExcelDownloadButtonClick = () => {
    if (!excelFileUrl) {
      toast.error('파일을 불러오는 데 실패하였습니다.');
      return;
    }
    const a = document.createElement('a');
    a.href = excelFileUrl;
    a.download = '마일스톤_점수_현황.xlsx';
    a.click();
  };

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <PeriodSearchBox period={filterPeriod} setPeriod={setFilterPeriod} setSearchPeriod={setSearchFilterPeriod} />
      </div>
      <div className="mb-8 min-h-[426px] w-full overflow-x-scroll text-xs">
        <table className="border-collapse text-center">
          <thead className="border-b-2 border-border align-bottom">
            <tr>
              <th className="min-w-[8em] pb-2">순위</th>
              <th className="min-w-[6em] pb-2">이름</th>
              <th className="min-w-[10em] pb-2">학번</th>
              <th className="min-w-20 pb-2">총점</th>
              {Object.values(MilestoneGroup).map((group) => (
                <>
                  {milestones &&
                    milestones[group]?.map((milestone) => (
                      <th key={milestone.id} className="min-w-20 break-keep p-2">
                        {milestone.name}
                      </th>
                    ))}
                  <th key={group} className="min-w-20 break-keep p-2">
                    {convertMilestoneGroup(group)} SW역량 소계
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {milestoneScores?.content?.map((milestoneScore, index) => (
              <tr key={milestoneScore.student.id} className="border-b border-border">
                <td>{milestoneScores!.size * milestoneScores!.number + index + 1}</td>
                <td>{milestoneScore.student.name}</td>
                <td className="border-r-2 border-border">{milestoneScore.student.id}</td>
                <td className="min-w-20 bg-admin-primary-main p-2 font-bold text-admin-white">
                  {Object.values(milestoneScore.milestoneScores).reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.reduce((acc, curr) => acc + curr.score, 0),
                    0,
                  )}
                </td>
                {Object.values(MilestoneGroup).map((group) => (
                  <>
                    {milestoneScore.milestoneScores[group].map((score) => (
                      <td key={score.id} className="min-w-20 border-r border-border p-2">
                        {score.score}
                      </td>
                    ))}
                    <td key={group} className="min-w-20 bg-admin-background-point p-2 font-bold">
                      {milestoneScore.milestoneScores[group].reduce((acc, curr) => acc + curr.score, 0)}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-sm bg-admin-primary-main px-4 py-2 text-white hover:bg-admin-primary-dark"
          onClick={handleExcelDownloadButtonClick}
        >
          Excel로 다운로드
        </button>
      </div>
      <AdminPagination currentPage={page} totalItems={milestoneScores?.totalElements ?? 0} pathname={pathname} />
    </div>
  );
}
