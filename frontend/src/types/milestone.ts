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
