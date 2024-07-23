'use client';

import { usePathname } from 'next/navigation';

import { adminCategories } from '@/data/adminCategory';

import { HeaderLinker, HeaderLinkerPoint } from './styled';

const Navigator = () => {
  const pathname = usePathname();
  return (
    <>
      {adminCategories.map((item) => {
        if (pathname.includes(item.url)) {
          return (
            <HeaderLinkerPoint key={item.url} href={item.sub[0].url}>
              {item.title}
            </HeaderLinkerPoint>
          );
        }
        return (
          <HeaderLinker key={item.url} href={item.sub[0].url}>
            {item.title}
          </HeaderLinker>
        );
      })}
    </>
  );
};

export default Navigator;
