import { useMemo } from 'react';

import MilestoneCircleChart from '@/components/ui/milestone/MilestoneCircleChart';
import MilestoneOverviewTable from '@/components/ui/milestone/MilestoneOverviewTable';
import { initialMilestoneOverview } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneOverviewScore } from '@/types/milestone';

import MyPageMilestoneDetail from './MyPageMilestoneDetail';

export interface MyPageMilestoneOverviewProps {
  searchFilterPeriod: Period;
}

export default function MyPageMilestoneOverview({ searchFilterPeriod }: MyPageMilestoneOverviewProps) {
  const auth = useAppSelector((state) => state.auth).value;
  const { data: milestoneScoresOfStudent } = useMilestoneScoresOfStudentQuery(
    auth.id,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
  );
  const milestoneOverviewScore: MilestoneOverviewScore = useMemo(
    () =>
      milestoneScoresOfStudent?.reduce<MilestoneOverviewScore>(
        (acc, cur) => {
          const key = `${cur.group.toLowerCase()}Score` as keyof MilestoneOverviewScore;
          acc[key] += cur.score;
          acc.totalScore += cur.score;
          return acc;
        },
        { ...initialMilestoneOverview },
      ) || initialMilestoneOverview,
    [milestoneScoresOfStudent],
  );
  return (
    <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
      <div className="flex min-w-[330px] flex-col gap-4">
        <MilestoneCircleChart chartSize={180} fontSize="lg" milestoneOverviewScore={milestoneOverviewScore} />
        <MilestoneOverviewTable milestoneOverviewScore={milestoneOverviewScore} />
      </div>
      <MyPageMilestoneDetail startDate={searchFilterPeriod.startDate} endDate={searchFilterPeriod.endDate} />
    </div>
  );
}
