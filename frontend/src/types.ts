export interface CategoryInfo {
  title: string;
  url: string;
  description?: string;
  sub: SubCategoryInfo[];
}

export interface SubCategoryInfo {
  title: string;
  url: string;
  key: string;
}

export interface AnnouncementInfo {
  id: number;
  url: string;
  title: string;
  date: string;
}

export interface MilestoneSummary {
  practicalScore: number;
  globalScore: number;
  communicationScore: number;
  totalScore: number;
}

export interface TeamBuildingInfo {
  id: number;
  category: string;
  status: 'RECRUITMENT_END' | 'RECRUITING';
  title: string;
  developer: number;
  designer: number;
  artist: number;
  other: number;
  views: number;
}
