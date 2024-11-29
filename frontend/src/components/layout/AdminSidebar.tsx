'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { adminCategories } from '@/data/adminCategory';

export default function AdminSidebar() {
  const [currTab, setCurrTab] = useState<string>('');
  const pathname = usePathname();

  const titleStyle = 'block max-h-[42px] cursor-default overflow-hidden border-b border-admin-border px-5 py-2.5';

  const handleTabClick = (tab: string) => {
    setCurrTab(tab);
  };

  useEffect(() => {
    setCurrTab(pathname);
  }, [pathname]);

  return (
    <div className="w-admin-sidebar fixed z-10 mt-[calc(theme(height.admin-header)+2px)] h-[calc(100vh-theme(height.admin-header))] bg-white shadow-sm">
      <div className="flex h-full w-full flex-col">
        {adminCategories.map((item) => (
          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            key={item.title}
            style={{ maxHeight: `${currTab.includes(item.url) || pathname.includes(item.url) ? '200px' : '42px'}` }}
          >
            {currTab.includes(item.url) ? (
              <div
                className={`bg-admin-secondary-main text-white ${titleStyle}`}
                onClick={() => handleTabClick(item.url)}
              >
                {item.title}
              </div>
            ) : (
              <div className={titleStyle} onClick={() => handleTabClick(item.url)}>
                {item.title}
              </div>
            )}
            {item.sub.map((subItem) => (
              <Link
                className="block border-b border-admin-border bg-admin-background-light px-7 py-2.5 text-admin-comment"
                key={subItem.key}
                href={subItem.url}
                style={{ fontWeight: `${pathname === subItem.url ? '700' : '400'}` }}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
