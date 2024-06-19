'use client';

import {} from './styled';
import { headerInfos } from '../Header';
import { HeaderInfo, SubCategoryInfo } from '@/types';
import { GetStaticProps } from 'next';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const SideBar = () => {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState<HeaderInfo | null>();
  const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryInfo | null>();
  const findMatchPath = useCallback(() => {
    let maxOverlap = 0;
    let bestMatch: SubCategoryInfo | null = null;
    currentCategory?.sub.forEach((category) => {
      const { url } = category;
      if (pathname.startsWith(url) && url.length > maxOverlap) {
        maxOverlap = url.length;
        bestMatch = category;
      }
    });
    return bestMatch;
  }, [pathname, currentCategory]);

  useEffect(() => {
    setCurrentCategory(headerInfos.filter((headerInfo) => pathname.startsWith(headerInfo.url))[0]);
    setCurrentSubCategory(findMatchPath());
    console.log(currentSubCategory);
  }, [pathname, findMatchPath]);

  return (
    <>
      <div>{currentCategory?.title}</div>
      <div>{currentSubCategory?.title}</div>
    </>
  );
};

export default SideBar;
