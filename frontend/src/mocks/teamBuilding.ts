import { TeamBuildingDto } from '@/types/common.dto';

export const teamBuildingInfos: TeamBuildingDto[] = [
  {
    id: 1,
    category: '대회',
    status: 'RECRUITMENT_END',
    title: '딥러닝 기법을 이용한 사람의 행동 분류',
    developer: 20,
    designer: 99,
    artist: 10,
    other: 19,
    views: 138,
  },
  {
    id: 2,
    category: '해커톤',
    status: 'RECRUITING',
    title: 'API를 통한 신약개발 후보물질 추천을 위한 머신러닝 기법 설계',
    developer: 0,
    designer: 1,
    artist: 0,
    other: 1,
    views: 20,
  },
  {
    id: 3,
    category: '동아리',
    status: 'RECRUITING',
    title: 'ZNS(Zoned Namespace)를 이용한 Level DB 성능 개선 분과',
    developer: 2,
    designer: 0,
    artist: 1,
    other: 0,
    views: 0,
  },
];
