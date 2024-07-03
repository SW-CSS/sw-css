import { MilestoneHistoryStatus } from './milestone';

export const QueryKeys = {
  COLLEGES: ['colleges'],
  MILESTONE_SCORES_OF_STUDENT: (memberId: number, startDate: string, endDate: string) => [
    'milestone-scores-of-student',
    memberId,
    startDate,
    endDate,
  ],
  MILESTONE_HISTORIES_OF_STUDENT: ({
    memberId,
    startDate,
    endDate,
    filter,
  }: {
    memberId: number;
    startDate?: string;
    endDate?: string;
    filter?: MilestoneHistoryStatus;
  }) => ['milestone-histories-of-student', memberId, startDate, endDate, filter],
};
