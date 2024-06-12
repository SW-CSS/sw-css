import * as S from './style';

export interface HeaderInfo {
  title: string;
  url: string;
  sub: {
    title: string;
    url: string;
    key: string;
  }[];
}

export const headerAdminInfos: HeaderInfo[] = [
  {
    title: '마일스톤 관리',
    url: '/admin/milestone',
    sub: [
      { title: '마일스톤 목록', url: '/admin/milestone', key: 'milestone-list' },
      { title: '마일스톤 일괄 등록', url: '/admin/milestone-register', key: 'milestone-register' },
      { title: '마일스톤 점수 현황', url: '/admin/milestone-rank', key: 'milestone-rank' },
    ],
  },
  {
    title: '교직원 관리',
    url: '/admin/faculty',
    sub: [
      { title: '교직원 목록', url: '/admin/faculty', key: 'faculty-list' },
      { title: '교직원 등록', url: '/admin/faculty-register', key: 'faculty-register' },
    ],
  },
  {
    title: '학생 관리',
    url: '/admin/member',
    sub: [
      { title: '학생 목록', url: '/admin/member', key: 'member-list' },
      { title: '학생 미가입자', url: '/admin/member-register', key: 'member-register' },
    ],
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
      { title: '대회 생성', url: '/admin/contest-create', key: 'contest-create' },
    ],
  },
];

const Header = () => (
  <S.HeaderWrapper>
    <S.HeaderLayout />
  </S.HeaderWrapper>
);

export default Header;
