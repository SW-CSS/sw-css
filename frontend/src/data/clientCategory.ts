import { CategoryDto } from '@/types/common.dto';

export const headerInfos: CategoryDto[] = [
  {
    title: '마일스톤',
    url: '/milestone',
    description: '마일스톤이란?',
    sub: [{ title: '마일스톤이란?', url: '/milestone', key: '1_milestone' }],
  },
  {
    title: '팀빌딩',
    url: '/team-building',
    description: '팀원을 모집하는 공간입니다.',
    sub: [{ title: '팀빌딩', url: '/', key: '2_teamBuilding' }],
  },
  {
    title: 'PNU 해커톤',
    url: '/hackathon',
    description: '부산대학교에서는 매년 창의 융합 소프트웨어 해커톤을 진행하고 있습니다.',
    sub: [
      { title: '진행중인 해커톤', url: '/hackathon', key: 'onGoingHackathon' },
      { title: '창의융합SW해커톤', url: '/hackathon/sw-hackathon', key: 'SWHackathon' },
      { title: 'SW문제 해결 경진대회', url: '/hackathon/sw-contest', key: 'problemContest' },
    ],
  },
];
