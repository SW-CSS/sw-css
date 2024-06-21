'use client';

import { headerAdminInfos } from '../Header';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import * as S from './styled';

const Sidebar = () => {
  const [currTab, setCurrTab] = useState<string>('');
  const pathname = usePathname();

  const handleTabClick = (tab: string) => {
    setCurrTab(tab);
  };

  useEffect(() => {
    setCurrTab(pathname);
  }, [pathname]);

  return (
    <S.SidebarWrapper>
      <S.SidebarLayout>
        {headerAdminInfos.map((item) => (
          <S.SidebarContentLayout
            key={item.title}
            style={{ maxHeight: `${currTab.includes(item.url) || pathname.includes(item.url) ? '200px' : '42px'}` }}
          >
            {currTab.includes(item.url) ? (
              <S.SidebarContentPointTitle onClick={() => handleTabClick(item.url)}>
                {item.title}
              </S.SidebarContentPointTitle>
            ) : (
              <S.SidebarContentTitle onClick={() => handleTabClick(item.url)}>{item.title}</S.SidebarContentTitle>
            )}
            {item.sub.map((subItem) => (
              <S.SidebarContentSubTitle
                key={subItem.key}
                href={subItem.url}
                style={{ fontWeight: `${pathname === subItem.url ? '700' : '400'}` }}
              >
                {subItem.title}
              </S.SidebarContentSubTitle>
            ))}
          </S.SidebarContentLayout>
        ))}
      </S.SidebarLayout>
    </S.SidebarWrapper>
  );
};

export default Sidebar;
