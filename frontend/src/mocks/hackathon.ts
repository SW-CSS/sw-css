import { HackathonTeamPageableDto } from '@/types/common.dto';

export const mockHackathonTeamPageableData: HackathonTeamPageableDto = {
  totalPages: 3,
  totalElements: 25,
  size: 10,
  number: 1, // 현재 페이지 (1 기반 인덱스)
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: false, // 현재 페이지가 첫 페이지인지 여부
  last: false, // 현재 페이지가 마지막 페이지인지 여부
  pageable: '{"page":1,"size":10}', // 페이지 요청 정보 (JSON 형식)
  numberOfElements: 10, // 현재 페이지의 항목 수
  empty: false, // 현재 페이지가 비어 있는지 여부
  content: [
    {
      id: 1,
      name: '팀 알파',
      githubUrl: 'https://github.com/team-alpha',
      teamMembers: [
        {
          id: 1,
          name: '김철수',
          majorName: '컴퓨터 과학',
          role: '개발자',
          isLeader: true,
        },
        {
          id: 2,
          name: '이영희',
          majorName: '수학',
          role: '디자이너',
          isLeader: false,
        },
      ],
      thumbnailImageName: 'test1.jpeg',
      voteCount: 120,
    },
    {
      id: 2,
      name: '팀 베타',
      githubUrl: 'https://github.com/team-beta',
      teamMembers: [
        {
          id: 3,
          name: '박하나',
          majorName: '공학',
          role: '개발자',
          isLeader: false,
        },
        {
          id: 4,
          name: '최민수',
          majorName: '물리학',
          role: '프로젝트 매니저',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'test2.jpeg',
      voteCount: 95,
    },
    {
      id: 3,
      name: '팀 감마',
      githubUrl: 'https://github.com/team-gamma',
      teamMembers: [
        {
          id: 5,
          name: '정수정',
          majorName: '데이터 과학',
          role: '데이터 분석가',
          isLeader: false,
        },
        {
          id: 6,
          name: '김영준',
          majorName: '통계학',
          role: '개발자',
          isLeader: true,
        },
        {
          id: 1,
          name: '김철수',
          majorName: '컴퓨터 과학',
          role: '개발자',
          isLeader: true,
        },
        {
          id: 2,
          name: '이영희',
          majorName: '수학',
          role: '디자이너',
          isLeader: false,
        },
      ],
      thumbnailImageName: 'test3.png',
      voteCount: 120,
    },
    {
      id: 4,
      name: '팀 베타',
      githubUrl: 'https://github.com/team-beta',
      teamMembers: [
        {
          id: 3,
          name: '박하나',
          majorName: '공학',
          role: '개발자',
          isLeader: false,
        },
        {
          id: 4,
          name: '최민수',
          majorName: '물리학',
          role: '프로젝트 매니저',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'test1.jpeg',
      voteCount: 95,
    },
    {
      id: 5,
      name: '팀 감마',
      githubUrl: 'https://github.com/team-gamma',
      teamMembers: [
        {
          id: 5,
          name: '정수정',
          majorName: '데이터 과학',
          role: '데이터 분석가',
          isLeader: false,
        },
        {
          id: 6,
          name: '김영준',
          majorName: '통계학',
          role: '개발자',
          isLeader: true,
        },
        {
          id: 1,
          name: '김철수',
          majorName: '컴퓨터 과학',
          role: '개발자',
          isLeader: true,
        },
        {
          id: 2,
          name: '이영희',
          majorName: '수학',
          role: '디자이너',
          isLeader: false,
        },
      ],
      thumbnailImageName: 'test2.jpeg',
      voteCount: 120,
    },
    {
      id: 6,
      name: '팀 베타',
      githubUrl: 'https://github.com/team-beta',
      teamMembers: [
        {
          id: 3,
          name: '박하나',
          majorName: '공학',
          role: '개발자',
          isLeader: false,
        },
        {
          id: 4,
          name: '최민수',
          majorName: '물리학',
          role: '프로젝트 매니저',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'test3.png',
      voteCount: 95,
    },
    {
      id: 7,
      name: '팀 감마',
      githubUrl: 'https://github.com/team-gamma',
      teamMembers: [
        {
          id: 5,
          name: '정수정',
          majorName: '데이터 과학',
          role: '데이터 분석가',
          isLeader: false,
        },
        {
          id: 6,
          name: '김영준',
          majorName: '통계학',
          role: '개발자',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'test1.jpeg',
      voteCount: 85,
    },
    // 필요한 경우 더 많은 팀 데이터를 추가할 수 있습니다.
  ],
};
