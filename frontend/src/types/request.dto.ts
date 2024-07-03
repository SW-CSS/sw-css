import { MilestoneHistoryStatus } from '@/data/milestone';

export interface MilestoneScoresOfStudentQuery {
  memberId: number;
  startDate: string;
  endDate: string;
}

export interface MilestoneHistoriesOfStudentQuery {
  memberId: number;
  startDate?: string;
  endDate?: string;
  filter?: MilestoneHistoryStatus;
}
