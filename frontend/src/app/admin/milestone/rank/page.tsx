/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { DateTime } from 'luxon';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Pagination from '@/adminComponents/Pagination';
import MilestonePeriodSearchForm from '@/components/MilestonePeriodSearchForm';
import { MilestoneGroup } from '@/data/milestone';
import { useMilestoneScoresQuery } from '@/lib/hooks/useAdminApi';
import { useMilestoneQuery } from '@/lib/hooks/useApi';
import { convertMilestoneGroup } from '@/lib/utils/utils';
import { Period } from '@/types/common';

const Page = ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const [filterPeriod, setFilterPeriod] = useState<Period>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<Period>(filterPeriod);
  const pathname = usePathname();
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  const { data: milestoneScores } = useMilestoneScoresQuery(
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
    page - 1,
    undefined,
  );
  const { data: milestones } = useMilestoneQuery();

  return (
    <div>
      <div className="mb-8 flex justify-end">
        <MilestonePeriodSearchForm
          filterPeriod={filterPeriod}
          setFilterPeriod={setFilterPeriod}
          setSearchFilterPeriod={setSearchFilterPeriod}
        />
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
                    <td key={group} className="bg-admin-background-point min-w-20 p-2 font-bold">
                      {milestoneScore.milestoneScores[group].reduce((acc, curr) => acc + curr.score, 0)}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} totalItems={milestoneScores?.totalElements ?? 0} pathname={pathname} />
    </div>
  );
};

export default Page;
