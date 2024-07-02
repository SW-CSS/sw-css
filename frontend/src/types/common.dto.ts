export interface CategoryDto {
  title: string;
  url: string;
  description?: string;
  inHeader?: boolean;
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

export interface CollegesResponseDto {
  id: number;
  name: string;
  createdAt: string;
}

interface StudentReferenceDto {
  id: number;
  name: string;
}

export interface MilestoneScoreDto {
  id: number;
  name: string;
  group: string;
  limitScore: number;
  score: number;
}

export interface MilestoneScoreOfStudentResponseDto {
  student: StudentReferenceDto;
  milestoneScores: MilestoneScoreDto[];
}

interface MilestoneReferenceDto {
  id: number;
  name: string;
  categoryName: string;
  categoryGroup: string;
  score: number;
}

export interface MilestoneHistoryOfStudentResponseDto {
  id: number;
  milestone: MilestoneReferenceDto;
  description: string;
  fileUrl: string;
  status: string;
  rejectReason: string | null;
  count: number;
  activatedAt: string;
  createdAt: string;
}

export interface TotalMilestoneScores {
  activityScore: number;
  globalScore: number;
  communityScore: number;
  totalScore: number;
}
