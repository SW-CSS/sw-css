import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import { MilestoneHistoryStatus } from './milestone';

export const QueryKeys = {
  COLLEGES: ['colleges'],
  MILESTONE_SCORES_OF_STUDENT: (memberId: number, startDate: string, endDate: string) => [
    'milestone-scores-of-student',
    memberId,
    startDate,
    endDate,
  ],
  MILESTONE_HISTORIES_OF_STUDENT: (
    memberId: number,
    startDate: string | undefined = undefined,
    endDate: string | undefined = undefined,
    filter: MilestoneHistoryStatus | undefined = undefined,
    sortBy: MilestoneHistorySortCriteria | undefined = undefined,
    sortDirection: SortDirection | undefined = undefined,
    page: number = 0,
    size: number = 10,
  ) => ['milestone-histories-of-student', memberId, startDate, endDate, filter, sortBy, sortDirection, page, size],
  MILESTONES: ['milestones'],
  STUDENT: (memberId: number) => ['student', memberId],
  STUDENTS: ['students'],
  MILESTONE_HISTORY_EXCEL: (keyword: number | null, field: string | null) => [
    'milestone-history-excel',
    keyword,
    field,
  ],
  MILESTONE_SCORES: (
    startDate: string,
    endDate: string,
    page: number | undefined = 0,
    size: number | undefined = 10,
  ) => ['milestone-scores', startDate, endDate, page, size],
  MILESTONE_HISTORY_SCORE_EXCEL: (startDate: string, endDate: string) => ['milestone-score-excel', startDate, endDate],
  FILE: (fileName: string | null) => ['file', fileName],
  HACKATHON_TEAMS: (hackathonId: number, page: number, size: number) => ['hackathon-teams', hackathonId, page, size],
  HACKATHON_PRIZE: (hackathonId: number) => ['hackathon-prize', hackathonId],
  GITHUB_README: (owner: string, repo: string) => ['github-readme', owner, repo],
  DUPLICATE_STUDENT_ID: ['duplicate_student_id'],
};
