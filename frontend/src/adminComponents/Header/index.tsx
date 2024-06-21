'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { AdminBlackButton, AdminGrayButton } from '@/app/admin/styled';
import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';
import { HeaderInfo } from '@/types';

import * as S from './styled';
import { useAppSelector } from '@/hocks/redux';

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

const Header = () => {
  const pathname = usePathname();

  const auth = useAppSelector((state) => state.auth).value;

  return (
    <S.HeaderWrapper>
      <S.HeaderLayout>
        <div style={{ display: 'flex' }}>
          <S.LogoLink href="/">
            <Image src="/svgs/SW_logo.svg" alt="SW_logo" width="120" height="40" priority={false} />
          </S.LogoLink>
          {headerAdminInfos.map((item) => {
            if (pathname === item.url) return <S.HeaderLinkerPoint href={item.url}>{item.title}</S.HeaderLinkerPoint>;
            return <S.HeaderLinker href={item.url}>{item.title}</S.HeaderLinker>;
          })}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ font: FONT_STYLE.xs, color: COLOR.comment, display: 'flex', alignItems: 'center' }}>
            반갑습니다! <span style={{ color: COLOR.admin_point }}>{auth.username}</span>님
          </span>
          <AdminGrayButton style={{ font: FONT_STYLE.xs, border: 'none', borderRadius: BORDER_RADIUS.lg }}>
            사이트 메인으로
          </AdminGrayButton>
          <AdminBlackButton style={{ font: FONT_STYLE.xs, borderRadius: BORDER_RADIUS.lg }}>로그아웃</AdminBlackButton>
        </div>
      </S.HeaderLayout>
    </S.HeaderWrapper>
  );
};

export default Header;
