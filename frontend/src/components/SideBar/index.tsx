'use client';

import { headerInfos } from '../Header';
import { HeaderInfo, SubCategoryInfo } from '@/types';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  SidebarCategory,
  SidebarCategoryDescription,
  SidebarCategoryList,
  SidebarCategoryTitle,
  SidebarWrapper,
} from './styled';

const Sidebar = () => {
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
    <SidebarWrapper>
      <SidebarCategoryTitle>{currentCategory?.title}</SidebarCategoryTitle>
      <SidebarCategoryDescription>{currentCategory?.description}</SidebarCategoryDescription>
      <SidebarCategoryList>
        {currentCategory?.sub.map((sub) => (
          <SidebarCategory isCurrentCategory={sub.title === currentSubCategory?.title} key={sub.title} href={sub.url}>
            {sub.title}
          </SidebarCategory>
        ))}
      </SidebarCategoryList>
    </SidebarWrapper>
  );
};

export default Sidebar;
