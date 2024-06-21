'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { VscSignIn, VscSignOut, VscAccount } from 'react-icons/vsc';

import { useAppSelector } from '@/hocks/redux';
import { HeaderInfo } from '@/types';

import HeaderAccordion from './HeaderAccordion';
import Sidebar from './Sidebar';
import * as S from './styled';
import IconButton from '../IconButton';

export const headerInfos: HeaderInfo[] = [
  {
    title: '마일스톤',
    url: '/milestone',
    description: '마일스톤이란?',
    sub: [{ title: '마일스톤이란?', url: '/milestone', key: '1_milestone' }],
  },
  {
    title: '팀빌딩',
    url: '/team-building',
    description: '팀원을 모집하는 공간입니다.',
    sub: [{ title: '팀빌딩', url: '/', key: '2_teamBuilding' }],
  },
  {
    title: 'PNU 해커톤',
    url: '/hackathon',
    description: '부산대학교에서는 매년 창의 융합 소프트웨어 해커톤을 진행하고 있습니다.',
    sub: [
      { title: '진행중인 해커톤', url: '/hackathon', key: 'onGoingHackathon' },
      { title: '창의융합SW해커톤', url: '/hackathon/sw-hackathon', key: 'SWHackathon' },
      { title: 'SW문제 해결 경진대회', url: '/hackathon/sw-contest', key: 'problemContest' },
    ],
  },
];

const Header = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const auth = useAppSelector((state) => state.auth.value);

  return (
    <S.HeaderWrapper>
      <S.HeaderDesktopLayout>
        <Link href="/" style={{ width: 'fit-content' }}>
          <Image src="/svgs/SW_logo.svg" alt="SW_logo" width="160" height="50" priority={false} />
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          {headerInfos.map((item) => (
            <HeaderAccordion
              key={item.title}
              title={item.title}
              url={item.url}
              sub={item.sub}
              description={item.description}
            />
          ))}
        </div>
        {auth.isAuth ? (
          <>
            <IconButton icon={<VscAccount />} title="마이페이지" size="sm" link="/my-page" />
            <IconButton icon={<VscSignOut />} title="로그아웃" size="sm" link="/sign-out" />
          </>
        ) : (
          <S.SignButton>
            <S.SignText>
              <Link href="/sign-in">로그인</Link> /<Link href="/sign-up">회원가입</Link>
            </S.SignText>
          </S.SignButton>
        )}
      </S.HeaderDesktopLayout>
      <S.SidebarBackground
        style={{ display: `${isSidebarOpen ? 'block' : 'none'}` }}
        onClick={() => setIsSideBarOpen(false)}
      />
      <S.HeaderTabletLayout>
        <Link href="/" style={{ width: 'fit-content', height: '50px', padding: '5px 10px' }}>
          <Image src="/svgs/SW_logo.svg" alt="SW_logo" width="125" height="40" priority={false} />
        </Link>
        <div style={{ display: 'flex' }}>
          {auth.isAuth ? (
            <>
              <IconButton icon={<VscAccount />} title="마이페이지" size="sm" link="/my-page" />
              <IconButton icon={<VscSignOut />} title="로그아웃" size="sm" link="/sign-out" />
            </>
          ) : (
            <IconButton icon={<VscSignIn />} title="로그인" size="sm" link="/sign-in" />
          )}
          <Sidebar open={isSidebarOpen} handleOpen={setIsSideBarOpen} headerInfos={headerInfos} />
        </div>
      </S.HeaderTabletLayout>
    </S.HeaderWrapper>
  );
};
export default Header;
