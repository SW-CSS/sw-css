export interface CategoryDto {
  title: string;
  url: string;
  description?: string;
  sub: SubCategoryDto[];
}

export interface SubCategoryDto {
  title: string;
  url: string;
  key: string;
}

export interface AnnouncementDto {
  id: number;
  url: string;
  title: string;
  date: string;
}

export interface MilestoneSummaryDto {
  practicalScore: number;
  globalScore: number;
  communicationScore: number;
  totalScore: number;
}

export interface TeamBuildingDto {
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
