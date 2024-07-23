/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { VscChevronDown } from '@react-icons/all-files/vsc/VscChevronDown';
import { VscChevronUp } from '@react-icons/all-files/vsc/VscChevronUp';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { headerInfos } from '@/data/clientCategory';
import { CategoryDto, SubCategoryDto } from '@/types/common.dto';

import * as S from './styled';

const Sidebar = () => {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState<CategoryDto | null>();
  const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryDto | null>();
  const [isOpenNavigationBar, setIsOpenNavigationBar] = useState<boolean>(false);

  const findMatchPath = useCallback(() => {
    let maxOverlap = 0;
    let bestMatch: SubCategoryDto | null = null;
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
  }, [pathname]);

  useEffect(() => {
    setCurrentSubCategory(findMatchPath());
  }, [findMatchPath]);

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
          {isOpenNavigationBar ? <VscChevronUp color="white" /> : <VscChevronDown color="white" />}
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
