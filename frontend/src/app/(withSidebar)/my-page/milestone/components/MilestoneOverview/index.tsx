/* eslint-disable implicit-arrow-linebreak */
import { useMemo } from 'react';

import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneOverviewScore } from '@/types/milestone';

import { MilestoneWrapper } from './styled';
import MilestoneDetail from '../MilestoneDetail';

const initialData: MilestoneOverviewScore = {
  activityScore: 0,
  globalScore: 0,
  communityScore: 0,
  totalScore: 0,
};
interface MilestoneOverviewProps {
  searchFilterPeriod: Period;
}

const MilestoneOverview = ({ searchFilterPeriod }: MilestoneOverviewProps) => {
  const { data: milestoneScoresOfStudent } = useMilestoneScoresOfStudentQuery({
    memberId: 202055558,
    startDate: searchFilterPeriod.startDate,
    endDate: searchFilterPeriod.endDate,
  });
  const milestoneOverviewScore: MilestoneOverviewScore = useMemo(
    () =>
      milestoneScoresOfStudent?.reduce<MilestoneOverviewScore>(
        (acc, cur) => {
          const key = `${cur.group.toLowerCase()}Score` as keyof MilestoneOverviewScore;
          acc[key] += cur.score;
          acc.totalScore += cur.score;
          return acc;
        },
        { ...initialData },
      ) || initialData,
    [milestoneScoresOfStudent],
  );
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <MilestoneWrapper>
        <MilestoneChart chartSize={180} fontSize="lg" milestoneOverviewScore={milestoneOverviewScore} />
        <MilestoneTable milestoneOverviewScore={milestoneOverviewScore} />
      </MilestoneWrapper>
      <MilestoneDetail startDate={searchFilterPeriod.startDate} endDate={searchFilterPeriod.endDate} />
    </div>
  );
};

export default MilestoneOverview;
