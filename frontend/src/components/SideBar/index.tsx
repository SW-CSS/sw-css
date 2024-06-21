'use client';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { headerInfos } from '../Header';
import { HeaderInfo, SubCategoryInfo } from '@/types';
import {
  SidebarCategory,
  SidebarCategoryDescription,
  SidebarCategoryList,
  SidebarCategoryTitle,
  SidebarMobileButton,
  SidebarMobileWrapper,
  SidebarWrapper,
} from './styled';

const Sidebar = () => {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState<HeaderInfo | null>();
  const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryInfo | null>();
  const [isOpenNavigationBar, setIsOpenNavigationBar] = useState<boolean>(false);

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
      <SidebarWrapper>
        <SidebarCategoryTitle>{currentCategory?.title}</SidebarCategoryTitle>
        <SidebarCategoryDescription>{currentCategory?.description}</SidebarCategoryDescription>
        <SidebarCategoryList isOpen={isOpenNavigationBar}>
          {currentCategory?.sub.map((sub) => (
            <SidebarCategory isCurrentCategory={sub.title === currentSubCategory?.title} key={sub.title} href={sub.url}>
              {sub.title}
            </SidebarCategory>
          ))}
        </SidebarCategoryList>
      </SidebarWrapper>
      <SidebarMobileWrapper>
        <SidebarMobileButton onClick={() => setIsOpenNavigationBar(!isOpenNavigationBar)}>
          {currentSubCategory?.title}
          {isOpenNavigationBar ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />}
        </SidebarMobileButton>

        <SidebarCategoryList isOpen={isOpenNavigationBar}>
          {currentCategory?.sub.map((sub) => (
            <SidebarCategory isCurrentCategory={sub.title === currentSubCategory?.title} key={sub.title} href={sub.url}>
              {sub.title}
            </SidebarCategory>
          ))}
        </SidebarCategoryList>
      </SidebarMobileWrapper>
    </>
  );
};

export default Sidebar;
