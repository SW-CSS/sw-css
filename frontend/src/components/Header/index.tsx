'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { VscSignIn, VscSignOut, VscAccount } from 'react-icons/vsc';

import { useAppSelector } from '@/hocks/redux';
import { headerBar } from '@/mocks/Header';

import Hamburger from './Hamburger';
import HeaderAccordion from './HeaderAccordion';
import {
  HeaderWrapper,
  HeaderDesktopLayout,
  HeaderTabletLayout,
  SignButton,
  SignText,
  SidebarBackground,
} from './style';
import IconButton from '../IconButton';

const Header = () => {
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const auth = useAppSelector((state) => state.auth.value);

  return (
    <HeaderWrapper>
      <HeaderDesktopLayout>
        <Link href="/" style={{ width: 'fit-content' }}>
          <Image src="/svgs/SW_logo.svg" alt="SW_logo" width="160" height="50" priority={false} />
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          {headerBar.map((item) => (
            <HeaderAccordion key={item.title} title={item.title} url={item.url} sub={item.sub} />
          ))}
        </div>
        {auth.isAuth ? (
          <>
            <IconButton icon={<VscAccount />} title="마이페이지" size="sm" link="/my-page" />
            <IconButton icon={<VscSignOut />} title="로그아웃" size="sm" link="/sign-out" />
          </>
        ) : (
          <SignButton>
            <SignText>
              <Link href="/sign-in">로그인</Link> /<Link href="/sign-up">회원가입</Link>
            </SignText>
          </SignButton>
        )}
      </HeaderDesktopLayout>
      <SidebarBackground
        style={{ display: `${isSidebarOpen ? 'block' : 'none'}` }}
        onClick={() => setIsSideBarOpen(false)}
      />
      <HeaderTabletLayout>
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
          <Hamburger open={isSidebarOpen} handleOpen={setIsSideBarOpen} headerBar={headerBar} />
        </div>
      </HeaderTabletLayout>
    </HeaderWrapper>
  );
};
export default Header;
