'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { adminCategories } from '@/data/adminCategory';
import { useAppSelector } from '@/lib/hooks/redux';

export default function AdminHeader() {
  return (
    <div className="fixed z-10 flex w-[100vw] min-w-admin-max justify-center border-b-2 border-primary-main bg-white">
      <div className="flex h-full w-full items-center justify-between pr-2">
        <div className="flex">
          <Link className="m-auto flex w-admin-sidebar items-center justify-center pl-2" href="/admin">
            <Image
              src="/images/logo/SW_logo.svg"
              alt="SW_logo"
              width="120"
              height="40"
              style={{ width: 120, height: 40 }}
              priority
            />
          </Link>
          <AdminNavigator />
        </div>
        <div className="flex gap-2 pr-10">
          <AdminGreetingUser />
          <Link className="rounded-lg bg-admin-secondary-light px-2 py-1 text-xs text-comment" href="/">
            사이트 메인으로
          </Link>
          <Link className="rounded-lg bg-black px-2 py-1 text-xs text-white" href="/sign-out">
            로그아웃
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminNavigator() {
  const pathname = usePathname();
  const linkStyle =
    "h-admin-header text-admin-comment after:absolute relative flex items-center px-5 after:left-0 after:top-[15%] after:h-[70%] after:w-[1px] after:bg-border after:content-['']";
  return (
    <>
      {adminCategories.map((item) => {
        if (pathname.includes(item.url)) {
          return (
            <Link
              className={`bg-admin-primary-main text-white after:!h-0 ${linkStyle}`}
              key={item.url}
              href={item.sub[0].url}
            >
              {item.title}
            </Link>
          );
        }
        return (
          <Link className={linkStyle} key={item.url} href={item.sub[0].url}>
            {item.title}
          </Link>
        );
      })}
    </>
  );
}

export function AdminGreetingUser() {
  const auth = useAppSelector((state) => state.auth).value;

  return (
    <span className="flex cursor-default items-center text-xs text-admin-comment">
      반갑습니다!
      <Link href="/admin/my-page" className="ml-1 text-admin-primary-main">
        {auth.name}
      </Link>
      님
    </span>
  );
}
