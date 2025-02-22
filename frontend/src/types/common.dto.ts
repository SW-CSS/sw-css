import { MilestoneGroup } from '@/data/milestone';

import { TeamMemberRole } from '@/data/hackathon';
import { Milestone } from './milestone';

interface Pageable {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 현재 페이지 (1 기반 인덱스)
  pageable: string; // 페이지 요청 정보 (JSON 형식) ex {"page":1,"size":10}
  numberOfElements: number; // 현재 페이지의 항목 수
  empty: boolean; // // 현재 페이지가 비어 있는지 여부
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

export interface FacultyMemberDto extends MemberDto {
  facultyId: number;
}

interface StudentMemberReferenceDto {
  id: number;
  name: string;
}

export interface HackathonDto {
  id: number;
  title: string;
  content: string;
  bannerImage: string;
  applyStartDate: string;
  applyEndDate: string;
  hackathonStartDate: string;
  hackathonEndDate: string;
  teamCode: string;
}

export interface HackathonManagePageableDto extends Pageable {
  content: HackathonManageDto[];
}

export interface HackathonManageDto
  extends Omit<HackathonDto, 'content' | 'bannerImage' | 'applyStartDate' | 'applyEndDate'> {
  isActive: boolean;
}

export type HackathonInformationDto = Omit<HackathonDto, 'teamCode'>;

export type HackathonOverviewDto = Omit<HackathonDto, 'content' | 'teamCode'>;

export interface HackathonPageableDto extends Pageable {
  content: HackathonOverviewDto[];
}

export interface TeamMemberDto {
  [key: string]: { id: number; name: string; major: string; isLeader: boolean }[];
}

export interface TeamMember {
  id: number | null;
  role: TeamMemberRole;
  isLeader: boolean;
}

export interface HackathonTeamDto {
  id: number;
  teamName: string;
  projectTitle: string;
  githubUrl: string;
  thumbnailImage: string;
  teamMembers: TeamMemberDto;
  voteCount: number;
  prize: string;
}

export interface HackathonTeamCreateDto {
  hackathonId: number;
  teamName: string;
  projectTitle: string;
  githubUrl: string;
  thumbnailImage: File | null;
  members: TeamMember[];
  password: string;
}

export interface HackathonTeamPageableDto extends Pageable {
  content: HackathonTeamDto[];
}

interface HackathonTeamReferenceDto {
  name: string;
  memberCount: number;
  work: string;
}

export interface HackathonPrizeDto {
  id: number;
  name: string;
  rank: number;
  teams: HackathonTeamReferenceDto[];
}

export interface FacultyMemberPageableDto extends Pageable {
  content: FacultyMemberDto[];
}
