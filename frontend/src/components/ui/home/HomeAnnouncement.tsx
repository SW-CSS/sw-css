import RSSParser from 'rss-parser';

import GoPageIcon from '@/components/ui/home/GoPageIcon';

import Link from 'next/link';

export default async function HomeAnnouncement() {
  const ANNOUNCEMENT_URL = 'https://swedu.pusan.ac.kr/swedu/31630/subview.do';
  const parser = new RSSParser();
  const announcements = await parser.parseURL('https://swedu.pusan.ac.kr/bbs/swedu/6906/rssList.do?row=50');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="cursor-default text-lg font-semibold">공지사항</p>
          <p className="cursor-default text-sm text-comment">소프트웨어융합교육원의 공지사항을 알려드려요.</p>
        </div>
        <GoPageIcon name="더보기" url={ANNOUNCEMENT_URL} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {announcements.items.slice(0, 4).map((item) => (
          <Link
            className="flex justify-between gap-5 rounded-sm border border-border p-[10px] hover:text-primary-main"
            key={item.link}
            href={item.link || ''}
            target="_blank"
          >
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-black">
              {item.title}
            </span>
            <span className="w-[90px] flex-shrink text-right text-sm text-comment">
              {item.pubDate?.slice(0, 10).replaceAll('-', '.')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
