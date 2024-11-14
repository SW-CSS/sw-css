'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { headerInfos } from '@/data/clientCategory';
import { CategoryDto, SubCategoryDto } from '@/types/common.dto';

import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();
  const [currentCategory, setCurrentCategory] = useState<CategoryDto | null>();
  const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryDto | null>();

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
    <div
      className="hidden w-[290px] border-r border-r-border bg-white px-5 pt-[120px] lg:block"
      style={{ minHeight: 'calc(100vh - 200px)' }}
    >
      <p className="text-xl font-semibold">{currentCategory?.title}</p>
      <p className="mt-8 break-keep text-sm text-comment">{currentCategory?.description}</p>
      <div className="z-40 mt-8 flex h-full w-full flex-col text-comment">
        {currentCategory?.sub.map((sub) => (
          <Link
            className={`mb-5 text-lg font-semibold leading-10 ${sub.title === currentSubCategory?.title && 'text-black underline underline-offset-8'}`}
            key={sub.title}
            href={sub.url}
          >
            {sub.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
