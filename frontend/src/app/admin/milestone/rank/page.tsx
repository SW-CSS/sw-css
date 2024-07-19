/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

import MilestonePeriodSearchForm from '@/components/MilestonePeriodSearchForm';
import { MilestoneGroup } from '@/data/milestone';
import { useMilestoneScoresQuery } from '@/lib/hooks/useAdminApi';
import { useMilestoneQuery } from '@/lib/hooks/useApi';
import { convertMilestoneGroup } from '@/lib/utils/utils';
import { Period } from '@/types/common';
import { MilestoneOverviewDto, MilestoneScoreDto, StudentReferenceDto } from '@/types/common.dto';

interface MilestoneByGroup {
  [k: string]: MilestoneOverviewDto[];
}
interface MilestoneScoreByGroup {
  [k: string]: MilestoneScoreDto[];
}
interface MilestoneScoreWithStudentByGroup {
  student: StudentReferenceDto;
  milestoneScores: MilestoneScoreByGroup;
}
const initialMilestonesByGroup = {
  [MilestoneGroup.ACTIVITY]: [],
  [MilestoneGroup.GLOBAL]: [],
  [MilestoneGroup.COMMUNITY]: [],
};
const Page = () => {
  const [filterPeriod, setFilterPeriod] = useState<Period>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<Period>(filterPeriod);

  const { data: milestoneScores } = useMilestoneScoresQuery(searchFilterPeriod.startDate, searchFilterPeriod.endDate);
  const { data: milestones } = useMilestoneQuery();

  const milestonesByGroup: MilestoneByGroup = useMemo(
    () =>
      milestones?.reduce(
        (acc: MilestoneByGroup, curr: MilestoneOverviewDto) => {
          const { group } = curr;
          acc[group] = [...acc[group], curr];
          return acc;
        },
        {
          [MilestoneGroup.ACTIVITY]: [],
          [MilestoneGroup.GLOBAL]: [],
          [MilestoneGroup.COMMUNITY]: [],
        },
      ) ?? initialMilestonesByGroup,
    [milestones],
  );

  const milestoneScoresByGroup: MilestoneScoreWithStudentByGroup[] = useMemo(
    () =>
      milestoneScores?.content.map((milestoneScore) => {
        const groupedMilestoneScores =
          milestoneScore.milestoneScores.reduce(
            (acc: MilestoneScoreByGroup, curr: MilestoneScoreDto) => {
              const { group } = curr;
              acc[group] = [...acc[group], curr];
              return acc;
            },
            {
              [MilestoneGroup.ACTIVITY]: [],
              [MilestoneGroup.GLOBAL]: [],
              [MilestoneGroup.COMMUNITY]: [],
            },
          ) ?? initialMilestonesByGroup;
        return { student: milestoneScore.student, milestoneScores: groupedMilestoneScores };
      }) ?? [],
    [milestoneScores],
  );
  return (
    <div>
      <div className="mb-8 flex justify-end">
        <MilestonePeriodSearchForm
          filterPeriod={filterPeriod}
          setFilterPeriod={setFilterPeriod}
          setSearchFilterPeriod={setSearchFilterPeriod}
        />
      </div>
      <div className="w-full overflow-x-scroll text-xs">
        <table className="border-collapse text-center">
          <thead className="border-b-2 border-border align-bottom">
            <tr>
              <th className="min-w-[8em] pb-2">순위</th>
              <th className="min-w-[6em] pb-2">이름</th>
              <th className="min-w-[10em] pb-2">학번</th>
              <th className="min-w-20 pb-2">총점</th>
              {Object.values(MilestoneGroup).map((group) => (
                <>
                  {milestonesByGroup[group]?.map((milestone) => (
                    <th key={milestone.id} className="min-w-20 break-keep p-2">
                      {milestone.name}
                    </th>
                  ))}
                  <th className="min-w-20 break-keep p-2">{convertMilestoneGroup(group)} SW역량 소계</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {milestoneScoresByGroup?.map((milestoneScore, index) => (
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
                    <td className="bg-admin-background-point min-w-20 p-2 font-bold">
                      {milestoneScore.milestoneScores[group].reduce((acc, curr) => acc + curr.score, 0)}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
