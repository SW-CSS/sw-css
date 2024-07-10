/* eslint-disable max-len */

'use client';

import { usePathname } from 'next/navigation';

export interface PageTabProps {
  tabs: { name: string; url: string }[];
}

const PageTab = ({ tabs }: PageTabProps) => {
  const pathname = usePathname();

  return (
    <div className="flex w-full text-center">
      {tabs.map((tab) => (
        <a
          key={tab.url}
          href={tab.url}
          className={`flex-grow pb-3 font-semibold ${pathname === tab.url ? 'border-b-4 border-primary-main text-primary-main' : 'border-b-[1px] border-comment text-comment'}`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};

export default PageTab;
