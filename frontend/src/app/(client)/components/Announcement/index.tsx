import RSSParser from 'rss-parser';

import GoPageIcon from '@/components/GoPageIcon';

import { AnnouncementDate, AnnouncementItem, AnnouncementTitle } from './styled';
import { Description, Title, TitleContent, TitleWrapper } from '../styled';

const Announcement = async () => {
  const ANNOUNCEMENT_URL = 'https://swedu.pusan.ac.kr/swedu/31630/subview.do';
  const parser = new RSSParser();
  const announcements = await parser.parseURL('https://swedu.pusan.ac.kr/bbs/swedu/6906/rssList.do?row=50');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleWrapper style={{ justifyContent: 'space-between' }}>
        <TitleContent>
          <Title>공지사항</Title>
          <Description>소프트웨어융합교육원의 공지사항을 알려드려요.</Description>
        </TitleContent>
        <GoPageIcon name="더보기" url={ANNOUNCEMENT_URL} />
      </TitleWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {announcements.items.slice(0, 4).map((item) => (
          <AnnouncementItem key={item.link} href={item.link ?? ''} target="_blank">
            <AnnouncementTitle>{item.title}</AnnouncementTitle>
            <AnnouncementDate>{item.pubDate?.slice(0, 10).replaceAll('-', '.')}</AnnouncementDate>
          </AnnouncementItem>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
