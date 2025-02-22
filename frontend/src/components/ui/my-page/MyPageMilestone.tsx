'use client';

import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

import MilestoneCircleChart from '@/components/ui/milestone/MilestoneCircleChart';
import MilestoneOverviewTable from '@/components/ui/milestone/MilestoneOverviewTable';
import PageSubTitle from '@/components/common/PageSubTitle';
import { MilestoneInfoType, initialMilestoneOverview, milestoneInfoTypes } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { compareByIdAsc } from '@/lib/utils/utils';
import { Period } from '@/types/common';
import { MilestoneOverviewScore } from '@/types/milestone';

import MilestoneDetailTable from '@/components/ui/milestone/MilestoneDetailTable';
import MilestoneAcceptedTable from '@/components/ui/milestone/MilestoneAcceptedTable';

export default function MyPageMilestone() {
  const auth = useAppSelector((state) => state.auth).value;
  const searchFilterPeriod: Period = {
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  };
  const [selectedInfoType, setSelectedInfoType] = useState<MilestoneInfoType>(MilestoneInfoType.TOTAL);
  const { data: milestoneScores } = useMilestoneScoresOfStudentQuery(
    auth.id,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
  );
  const milestoneOverviewScore: MilestoneOverviewScore = useMemo(
    () =>
      milestoneScores?.reduce<MilestoneOverviewScore>(
        (acc, cur) => {
          const key = `${cur.group.toLowerCase()}Score` as keyof MilestoneOverviewScore;
          acc[key] += cur.score;
          acc.totalScore += cur.score;
          return acc;
        },
        { ...initialMilestoneOverview },
      ) || initialMilestoneOverview,
    [milestoneScores],
  );

  return (
    <div className="w-full flex-1 rounded-sm bg-white p-5 sm:min-w-[630px] lg:max-w-[630px]">
      <PageSubTitle title="내 마일스톤 상세" urlText="전체보기" url="/my-page/milestone" />
      <div className="my-5 flex items-center justify-center gap-2 sm:justify-end">
        <span className="rounded-lg bg-border px-4 py-1">{searchFilterPeriod.startDate}</span>~
        <span className="rounded-lg bg-border px-4 py-1">{searchFilterPeriod.endDate}</span>
      </div>
      <div className="flex flex-wrap">
        {milestoneInfoTypes.map((type) => (
          <button
            type="button"
            className={`h-[30px] min-w-[6em] flex-grow border-0 bg-white ${selectedInfoType === type.id ? 'border-b-2 text-black' : 'text-comment'} border-black hover:border-b-2 hover:text-black`}
            key={type.id}
            onClick={() => setSelectedInfoType(type.id)}
          >
            {type.text}
          </button>
        ))}
      </div>
      <div className="p-4">
        {selectedInfoType === MilestoneInfoType.TOTAL && (
          <div className="flex flex-wrap gap-y-5 py-1 sm:py-10">
            <MilestoneCircleChart chartSize={180} fontSize="lg" milestoneOverviewScore={milestoneOverviewScore} />
            <MilestoneOverviewTable milestoneOverviewScore={milestoneOverviewScore} />
          </div>
        )}
        {(selectedInfoType === MilestoneInfoType.ACTIVITY ||
          selectedInfoType === MilestoneInfoType.GLOBAL ||
          selectedInfoType === MilestoneInfoType.COMMUNITY) && (
          <MilestoneDetailTable
            milestoneScores={
              milestoneScores
                ?.filter((milestoneScore) => milestoneScore.group === selectedInfoType)
                .sort(compareByIdAsc) ?? []
            }
          />
        )}
        {selectedInfoType === MilestoneInfoType.HISTORY && (
          <MilestoneAcceptedTable searchFilterPeriod={searchFilterPeriod} pageNumber={1} pageSize={5} />
        )}
      </div>
    </div>
  );
}
