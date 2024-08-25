/* eslint-disable implicit-arrow-linebreak */
import { useMemo } from 'react';

import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { initialMilestoneOverview } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneOverviewScore } from '@/types/milestone';

import { MilestoneWrapper } from './styled';
import MilestoneDetail from '../MilestoneDetail';

interface MilestoneOverviewProps {
  searchFilterPeriod: Period;
}

const MilestoneOverview = ({ searchFilterPeriod }: MilestoneOverviewProps) => {
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
      <MilestoneWrapper>
        <MilestoneChart chartSize={180} fontSize="lg" milestoneOverviewScore={milestoneOverviewScore} />
        <MilestoneTable milestoneOverviewScore={milestoneOverviewScore} />
      </MilestoneWrapper>
      <MilestoneDetail startDate={searchFilterPeriod.startDate} endDate={searchFilterPeriod.endDate} />
    </div>
  );
};

export default MilestoneOverview;
