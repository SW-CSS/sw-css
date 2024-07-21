/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { VscAccount } from '@react-icons/all-files/vsc/VscAccount';
import { VscSignIn } from '@react-icons/all-files/vsc/VscSignIn';
import { VscSignOut } from '@react-icons/all-files/vsc/VscSignOut';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { headerInfos } from '@/data/clientCategory';
import { useAppSelector } from '@/lib/hooks/redux';

import HeaderAccordion from './HeaderAccordion';
import Sidebar from './Sidebar';
import * as S from './styled';
import IconButton from '../IconButton';

const Header = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const auth = useAppSelector((state) => state.auth.value);

  return (
    <S.HeaderWrapper>
      <S.HeaderDesktopLayout>
        <Link href="/" style={{ width: 'fit-content' }}>
          <Image src="/images/logo/SW_logo.svg" alt="SW_logo" width="160" height="50" priority={false} />
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          {headerInfos.map(
            (item) =>
              item.inHeader && (
                <HeaderAccordion
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  sub={item.sub}
                  description={item.description}
                />
              ),
          )}
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
          <Image src="/images/logo/SW_logo.svg" alt="SW_logo" width="125" height="40" priority={false} />
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
