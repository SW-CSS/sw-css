'use client';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { headerInfos } from '../Header';
import { HeaderInfo, SubCategoryInfo } from '@/types';
import * as S from './styled';

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
  }, [pathname, findMatchPath]);

  return (
    <>
      <S.SidebarWrapper>
        <S.SidebarCategoryTitle>{currentCategory?.title}</S.SidebarCategoryTitle>
        <S.SidebarCategoryDescription>{currentCategory?.description}</S.SidebarCategoryDescription>
        <S.SidebarCategoryList isOpen={isOpenNavigationBar}>
          {currentCategory?.sub.map((sub) => (
            <S.SidebarCategory
              isCurrentCategory={sub.title === currentSubCategory?.title}
              key={sub.title}
              href={sub.url}
            >
              {sub.title}
            </S.SidebarCategory>
          ))}
        </S.SidebarCategoryList>
      </S.SidebarWrapper>
      <S.SidebarMobileWrapper>
        <S.SidebarMobileButton onClick={() => setIsOpenNavigationBar((prev) => !prev)}>
          {currentSubCategory?.title}
          {isOpenNavigationBar ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />}
        </S.SidebarMobileButton>

        <S.SidebarCategoryList isOpen={isOpenNavigationBar}>
          {currentCategory?.sub.map((sub) => (
            <S.SidebarCategory
              isCurrentCategory={sub.title === currentSubCategory?.title}
              key={sub.title}
              href={sub.url}
            >
              {sub.title}
            </S.SidebarCategory>
          ))}
        </S.SidebarCategoryList>
      </S.SidebarMobileWrapper>
    </>
  );
};

export default Sidebar;
