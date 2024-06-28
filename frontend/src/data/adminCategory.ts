/* eslint-disable import/prefer-default-export */
<<<<<<< Feature/#50-리액트_쿼리_셋팅
import { CategoryInfo } from '@/types/dto';
=======
import { CategoryDto } from '@/types/common.dto';
>>>>>>> main

export const adminCategories: CategoryDto[] = [
  {
    title: '마일스톤 관리',
    url: '/admin/milestone',
    sub: [
      { title: '마일스톤 목록', url: '/admin/milestone/list', key: 'milestone-list' },
      { title: '마일스톤 일괄 등록', url: '/admin/milestone/register', key: 'milestone-register' },
      { title: '마일스톤 점수 현황', url: '/admin/milestone/rank', key: 'milestone-rank' },
    ],
  },
  {
    title: '교직원 관리',
    url: '/admin/faculty',
    sub: [
      { title: '교직원 목록', url: '/admin/faculty/list', key: 'faculty-list' },
      { title: '교직원 등록', url: '/admin/faculty/register', key: 'faculty-register' },
    ],
  },
  {
    title: '학생 관리',
    url: '/admin/member',
    sub: [{ title: '학생 목록', url: '/admin/member/list', key: 'member-list' }],
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
      { title: '대회 목록', url: '/admin/contest/list', key: 'contest-list' },
      { title: '대회 생성', url: '/admin/contest/create', key: 'contest-create' },
    ],
  },
];
