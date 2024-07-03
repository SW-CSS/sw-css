import { MilestoneHistoriesOfStudentQuery, MilestoneScoresOfStudentQuery } from '@/types/request.dto';

export const QueryKeys = {
  COLLEGES: ['colleges'],
  MILESTONE_SCORES_OF_STUDENT: ({ memberId, startDate, endDate }: MilestoneScoresOfStudentQuery) => [
    'milestone-scores-of-student',
    memberId,
    startDate,
    endDate,
  ],
  MILESTONE_HISTORIES_OF_STUDENT: ({ memberId, startDate, endDate, filter }: MilestoneHistoriesOfStudentQuery) => [
    'milestone-histories-of-student',
    memberId,
    startDate,
    endDate,
    filter,
  ],
};
