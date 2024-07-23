import { MilestoneOverviewScore } from '@/types/milestone';

export enum MilestoneGroup {
  ACTIVITY = 'ACTIVITY',
  GLOBAL = 'GLOBAL',
  COMMUNITY = 'COMMUNITY',
}

export enum MilestoneInfoType {
  TOTAL = 'TOTAL',
  ACTIVITY = 'ACTIVITY',
  GLOBAL = 'GLOBAL',
  COMMUNITY = 'COMMUNITY',
  HISTORY = 'HISTORY',
}

export const milestoneGroups = [
  { id: MilestoneGroup.ACTIVITY, text: '실전적 SW역량' },
  { id: MilestoneGroup.GLOBAL, text: '글로벌 SW역량' },
  { id: MilestoneGroup.COMMUNITY, text: '커뮤니티 SW역량' },
];

export const milestoneInfoTypes = [
  { id: MilestoneInfoType.TOTAL, text: '전체' },
  { id: MilestoneInfoType.ACTIVITY, text: '실전적 SW역량' },
  { id: MilestoneInfoType.GLOBAL, text: '글로벌 SW역량' },
  { id: MilestoneInfoType.COMMUNITY, text: '커뮤니티 SW역량' },
  { id: MilestoneInfoType.HISTORY, text: '획득 내역' },
];

export enum MilestoneHistoryStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const initialMilestoneOverview: MilestoneOverviewScore = {
  activityScore: 0,
  globalScore: 0,
  communityScore: 0,
  totalScore: 0,
};

export const milestoneHistorySearchField = [
  {
    id: 1,
    name: '학번',
  },
  {
    id: 2,
    name: '학생 이름',
  },
  {
    id: 3,
    name: '마일스톤 제목',
  },
  {
    id: 4,
    name: '활동명',
  },
];
