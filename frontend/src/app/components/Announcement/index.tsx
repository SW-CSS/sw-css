import GoPageIcon from '@/components/GoPageIcon';
import { announcements } from '@/mocks/announcement';

import { AnnouncementDate, AnnouncementItem, AnnouncementTitle } from './styled';
import { Description, Title, TitleContent, TitleWrapper } from '../styled';

const Announcement = () => {
  const ANNOUNCEMENT_URL = 'https://swedu.pusan.ac.kr/swedu/31630/subview.do';

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
        {announcements.map((item) => (
          <AnnouncementItem key={item.id} href={item.url}>
            <AnnouncementTitle>{item.title}</AnnouncementTitle>
            <AnnouncementDate>{item.date}</AnnouncementDate>
          </AnnouncementItem>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
