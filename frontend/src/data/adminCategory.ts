import { CategoryDto } from '@/types/common.dto';

export const adminCategories: CategoryDto[] = [
  {
    title: '마일스톤 관리',
    url: '/admin/milestone',
    sub: [
      { title: '마일스톤 목록', url: '/admin/milestone', key: 'milestone-list' },
      { title: '마일스톤 일괄 등록', url: '/admin/milestone/register', key: 'milestone-register' },
      { title: '마일스톤 점수 현황', url: '/admin/milestone/rank', key: 'milestone-rank' },
    ],
  },
  {
    title: '교직원 관리',
    url: '/admin/faculty',
    sub: [
      { title: '교직원 목록', url: '/admin/faculty', key: 'faculty-list' },
      { title: '교직원 등록', url: '/admin/faculty/register', key: 'faculty-register' },
    ],
  },
  {
    title: '학생 관리',
    url: '/admin/student',
    sub: [{ title: '학생 목록', url: '/admin/student', key: 'student-list' }],
  },
  {
    title: '팀빌딩 관리',
    url: '/admin/team-building',
    sub: [{ title: '팀빌딩 목록', url: '/admin/team-building', key: 'team-building-list' }],
  },
  {
    title: '대회 관리',
    url: '/admin/contest',
    sub: [
      { title: '대회 목록', url: '/admin/contest', key: 'contest-list' },
      { title: '대회 생성', url: '/admin/contest/create', key: 'contest-create' },
    ],
  },
];
