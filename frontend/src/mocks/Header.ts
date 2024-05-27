/* eslint-disable import/prefer-default-export */
import { HeaderAccordionProps } from '@/components/Header/HeaderAccordion';

export const headerBar: HeaderAccordionProps[] = [
  {
    title: '마일스톤',
    url: '/milestone',
    sub: [{ title: '마일스톤이란?', url: '/milestone', key: '1_milestone' }],
  },
  {
    title: '팀빌딩',
    url: '/',
    sub: [{ title: '팀빌딩', url: '/', key: '2_teamBuilding' }],
  },
  {
    title: 'PNU 해커톤',
    url: '/',
    sub: [
      { title: '진행중인 해커톤', url: '/', key: 'onGoingHackathon' },
      { title: '창의융합SW해커톤', url: '/', key: 'SWHackathon' },
      { title: 'SW문제 해결 경진대회', url: '/', key: 'problemContest' },
    ],
  },
];
