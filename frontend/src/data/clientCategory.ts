import { CategoryDto } from '@/types/common.dto';

export const headerInfos: CategoryDto[] = [
  {
    title: '마일스톤',
    url: '/milestone',
    description: '마일스톤이란?',
    inHeader: true,
    sub: [{ title: '마일스톤이란?', url: '/milestone', key: '1_milestone' }],
  },
  {
    title: '팀빌딩',
    url: '/team-building',
    description: '팀원을 모집하는 공간입니다.',
    inHeader: true,
    sub: [{ title: '팀빌딩', url: '/', key: '2_teamBuilding' }],
  },
  {
    title: 'PNU 해커톤',
    url: '/hackathon',
    description: '부산대학교에서는 매년 창의 융합 소프트웨어 해커톤을 진행하고 있습니다.',
    inHeader: true,
    sub: [
      { title: '창의융합SW해커톤', url: '/hackathon', key: 'SWHackathon' },
      { title: 'SW문제 해결 경진대회', url: '/hackathon/sw-contest', key: 'problemContest' },
    ],
  },
  {
    title: '마이페이지',
    url: '/my-page',
    description: '나의 마일스톤 현황을 확인하고, 관리해보세요!',
    inHeader: false,
    sub: [
      { title: '전체보기', url: '/my-page', key: 'dashboard' },
      { title: '마일스톤 획득 내역', url: '/my-page/milestone', key: 'milestone' },
      { title: '실적 등록', url: '/my-page/milestone/register', key: 'result' },
    ],
  },
];
