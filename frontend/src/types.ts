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

export interface MilestoneSummary {
  practicalScore: number;
  globalScore: number;
  communicationScore: number;
  totalScore: number;
}
