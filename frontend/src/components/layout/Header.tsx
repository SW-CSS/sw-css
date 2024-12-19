'use client';

import { VscSettingsGear } from '@react-icons/all-files/vsc/VscSettingsGear';
import { VscAccount } from '@react-icons/all-files/vsc/VscAccount';
import { VscSignIn } from '@react-icons/all-files/vsc/VscSignIn';
import { VscSignOut } from '@react-icons/all-files/vsc/VscSignOut';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { headerInfos } from '@/data/clientCategory';
import { useAppSelector } from '@/lib/hooks/redux';
import { CategoryDto } from '@/types/common.dto';
import { AuthSliceState } from '@/store/auth.slice';
import IconButton from '@/components/common/IconButton';

interface HeaderUIProps {
  auth: AuthSliceState;
}

interface SidebarProps {
  open: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header() {
  const auth = useAppSelector((state) => state.auth.value);

  return (
    <header className="fixed z-50 h-client-header w-[100vw] border-b border-border bg-white pl-4 lg:h-client-lg-header lg:px-4">
      <DesktopLayoutHeader auth={auth} />
      <TabletLayoutHeader auth={auth} />
    </header>
  );
}

export function TabletLayoutHeader({ auth }: HeaderUIProps) {
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${isSidebarOpen ? 'block' : 'hidden'} absolute left-0 top-0 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)]`}
        onClick={() => setIsSideBarOpen(false)}
      />
      <div className="flex items-center justify-between lg:hidden">
        <Link href="/" style={{ width: 'fit-content', height: '50px', padding: '5px 10px' }}>
          <Image
            src="/images/logo/SW_logo.svg"
            alt="SW_logo"
            width="125"
            height="40"
            style={{ width: 125, height: 40 }}
            priority
          />
        </Link>
        <div className="flex">
          {auth.isAuth && auth.isModerator && (
            <>
              <IconButton icon={<VscSettingsGear />} title="관리" link="/admin" />
              <IconButton icon={<VscSignOut />} title="로그아웃" link="/sign-out" />
            </>
          )}
          {auth.isAuth && !auth.isModerator && (
            <>
              <IconButton icon={<VscAccount />} title="마이페이지" link="/my-page" />
              <IconButton icon={<VscSignOut />} title="로그아웃" link="/sign-out" />
            </>
          )}
          {!auth.isAuth && <IconButton icon={<VscSignIn />} title="로그인" link="/sign-in" />}
          <Sidebar open={isSidebarOpen} handleOpen={setIsSideBarOpen} />
        </div>
      </div>
    </>
  );
}

export function DesktopLayoutHeader({ auth }: HeaderUIProps) {
  return (
    <div className="m-auto hidden max-w-client-max content-between items-center lg:flex">
      <Link href="/" style={{ width: 'fit-content' }}>
        <Image
          src="/images/logo/SW_logo.svg"
          alt="SW_logo"
          width="160"
          height="50"
          style={{ width: 160, height: 50 }}
          priority
        />
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
      {auth.isAuth && auth.isModerator && (
        <>
          <IconButton icon={<VscSettingsGear />} title="관리" link="/admin" />
          <IconButton icon={<VscSignOut />} title="로그아웃" link="/sign-out" />
        </>
      )}
      {auth.isAuth && !auth.isModerator && (
        <>
          <IconButton icon={<VscAccount />} title="마이페이지" link="/my-page" />
          <IconButton icon={<VscSignOut />} title="로그아웃" link="/sign-out" />
        </>
      )}
      {!auth.isAuth && (
        <div className="rounded-md bg-primary-main p-[10px_20px]">
          <span className="text-sm font-normal text-white">
            <Link href="/sign-in">로그인</Link> /<Link href="/sign-up">회원가입</Link>
          </span>
        </div>
      )}
    </div>
  );
}

export function HeaderAccordion({ title, url, sub }: CategoryDto) {
  return (
    <div className="group relative h-client-lg-header items-center leading-client-lg-header">
      <Link className="p-[0_40px] text-lg font-semibold hover:text-primary-dark" href={url}>
        {title}
      </Link>
      <div className="color-comment absolute left-1/2 top-full max-h-0 w-[180px] -translate-x-1/2 overflow-hidden rounded-b-sm bg-white text-center text-sm font-normal shadow transition-[max-height] duration-500 ease-in-out group-hover:max-h-[200px]">
        {sub.map((item) => (
          <Link
            className="hover: block border-b border-border p-2 text-comment hover:text-primary-dark"
            key={item.key}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Sidebar({ open, handleOpen }: SidebarProps) {
  const [currTab, setCurrTab] = useState<string>('');

  const handleClose = () => {
    handleOpen((e) => !e);
    setCurrTab('');
  };

  return (
    <div className="relative h-client-header w-client-sidebar">
      <div
        className="absolute h-full w-full bg-primary-main transition-[left] duration-500 ease-in-out"
        onClick={handleClose}
        style={{ left: `${open ? '-200px' : 0}` }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-2/3 rounded-md border-2 border-white transition-transform duration-500 ease-in-out"
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(40deg)' : 'translate(-50%, calc(-50% - 12px))'}`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-2/3 rounded-md border-2 border-white transition-transform duration-500 ease-in-out"
          style={{ transform: 'translate(-50%, -50%)', display: `${open ? 'none' : 'block'}` }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-2/3 rounded-md border-2 border-white transition-transform duration-500 ease-in-out"
          style={{
            transform: `${open ? 'translate(-50%, -50%) rotate(-40deg)' : 'translate(-50%, calc(-50% + 12px))'}`,
          }}
        />
      </div>
      <div
        className="absolute h-[100vh] w-client-sidebar-open bg-white text-sm font-normal transition-[left] duration-500 ease-in-out"
        style={{ left: `${open ? '-150px' : '50px'}` }}
      >
        {headerInfos.map((item) => (
          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            key={item.title}
            style={{ maxHeight: `${currTab === item.title ? '200px' : '37px'}` }}
          >
            <div
              className={`${currTab === item.title ? 'bg-primary-dark' : 'transparent'} cursor-default border-b border-border p-[10px_20px] hover:text-primary-main`}
              style={{
                color: `${currTab === item.title ? 'white' : 'black'}`,
              }}
              onClick={() => setCurrTab(item.title)}
            >
              {item.title}
            </div>
            {item.sub.map((subItem) => (
              <Link
                className="block cursor-default border-b border-border bg-background-light p-[10px_30px] text-comment hover:text-primary-main"
                key={subItem.key}
                href={subItem.url}
                onClick={handleClose}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
