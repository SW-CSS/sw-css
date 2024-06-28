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

export interface CollegesResponseDto {
  id: number;
  name: string;
  createdAt: string;
}

interface StudentReferenceDto {
  id: number;
  name: string;
}

interface MilestoneScoreReferenceDto {
  id: number;
  name: string;
  group: string;
  limitScore: number;
  score: number;
}

export interface MilestoneScoreOfStudentResponseDto {
  student: StudentReferenceDto;
  milestoneScores: MilestoneScoreReferenceDto[];
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
