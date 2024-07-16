export interface MilestoneOverviewScore {
  activityScore: number;
  globalScore: number;
  communityScore: number;
  totalScore: number;
}

export interface Milestone {
  id: number;
  name: string;
  score: number;
  limitCount: number;
}

export interface MilestoneCategory {
  id: number;
  name: string;
  group: string;
  limitScore: number;
}

export enum MilestoneHistorySortCriteria {
  ACTIVATED_AT = 'ACTIVATED_AT',
  CREATED_AT = 'CREATED_AT',
  STATUS = 'STATUS',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
