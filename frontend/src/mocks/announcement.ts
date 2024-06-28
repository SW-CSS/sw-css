<<<<<<< Feature/#50-리액트_쿼리_셋팅
import { AnnouncementInfo } from '@/types/dto';
=======
import { AnnouncementDto } from '@/types/common.dto';
>>>>>>> main

export const announcements: AnnouncementDto[] = [
  { id: 1, url: '/', title: '[안내] 2024 제1회 전국대학 소프트웨어 성과 공유포럼', date: '2024.06.20' },
  { id: 2, url: '/', title: '[안내] 2024년 클라우드컴퓨팅 부트캠프 개최 및 참가 추가모집 공고', date: '2024.06.20' },
  { id: 3, url: '/', title: '[안내] 제5회 PNU 창의융합 소프트웨어해커톤(예선) 심사결과 공지', date: '2024.06.20' },
  {
    id: 4,
    url: '/',
    title: '[모집]2024 SW중심대학 디지털경진대회 AI부분 선발 기간연장안내(~6.19)',
    date: '2024.06.20',
  },
];
