import { MilestoneGroup } from '@/data/milestone';

import { Milestone } from './milestone';

interface PageSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: PageSort;
  first: boolean;
  last: boolean;
  pageable: string;
  numberOfElements: number;
  empty: boolean;
}

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

export interface MajorDto {
  id: number;
  name: string;
  createdAt: string;
}

export interface CollegeDto extends MajorDto {
  majors: MajorDto[];
}

export interface StudentReferenceDto {
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

interface MilestoneScoreByGroup {
  [k: string]: MilestoneScoreDto[];
}

interface MilestoneScoreOfStudentDto {
  student: StudentReferenceDto;
  milestoneScores: MilestoneScoreByGroup;
}

export interface MilestoneScoreOfStudentPageableDto extends Pageable {
  content: MilestoneScoreOfStudentDto[];
}

interface MilestoneReferenceDto {
  id: number;
  name: string;
  categoryName: string;
  categoryGroup: string;
  score: number;
}

interface MilestoneHistoryOfStudentDto {
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

export interface MilestoneHistoryOfStudentPageableDto extends Pageable {
  content: MilestoneHistoryOfStudentDto[];
}

export interface MilestoneHistoryDto {
  id: number;
  milestone: MilestoneReferenceDto;
  student: StudentMemberReferenceDto;
  description: string;
  fileUrl: string;
  status: string;
  rejectReason: string | null;
  count: number;
  activatedAt: string;
  createdAt: string;
}

export interface MilestoneHistoryPageableDto extends Pageable {
  content: MilestoneHistoryDto[];
}

interface MilestoneOverviewDto {
  id: number;
  name: string;
  group: MilestoneGroup;
  limitScore: number;
  milestones: Milestone[];
}

export interface MilestoneByGroupDto {
  [key: string]: MilestoneOverviewDto[];
}

export interface MilestoneHistoryCreateDto {
  milestoneId: number;
  description: string;
  count: number;
  file?: File;
  activatedAt: string;
}

export interface MemberDto {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface StudentMemberDto extends MemberDto {
  major: string;
  minor: string;
  doubleMajor: string;
  career: string;
  careerDetail: string;
}

interface StudentMemberReferenceDto {
  id: number;
  name: string;
}
