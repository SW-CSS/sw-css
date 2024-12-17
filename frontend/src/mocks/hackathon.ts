import { HackathonTeamPageableDto } from '@/types/common.dto';

export const mockHackathonTeamPageableData: HackathonTeamPageableDto = {
  totalPages: 3,
  totalElements: 25,
  size: 10,
  number: 1, // 현재 페이지 (1 기반 인덱스)
  pageable: '{"page":1,"size":10}', // 페이지 요청 정보 (JSON 형식)
  numberOfElements: 10, // 현재 페이지의 항목 수
  empty: false, // 현재 페이지가 비어 있는지 여부
  content: [
    {
      id: 1,
      teamName: '알파aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/pnu-code-place/code-place',
      teamMembers: {
        DEVELOPER: [
          {
            id: 3,
            name: '박하나',
            major: '공학',
            isLeader: false,
          },
          {
            id: 4,
            name: '최민수',
            major: '물리학',
            isLeader: true,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 120,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 2,
      teamName: '팀 베타',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/amaran-th/jwp-refactoring',
      teamMembers: {
        DEVELOPER: [
          {
            id: 3,
            name: '박하나',
            major: '공학',
            isLeader: false,
          },
          {
            id: 4,
            name: '최민수',
            major: '물리학',
            isLeader: true,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 95,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 3,
      teamName: '팀 감마',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/ueberdosis/tiptap',
      teamMembers: {
        DEVELOPER: [
          {
            id: 202055558,
            name: '정수정',
            major: '데이터 과학',
            isLeader: true,
          },
          {
            id: 202055555,
            name: '김영준',
            major: '통계학',
            isLeader: false,
          },
        ],
        DESIGNER: [
          {
            id: 202000000,
            name: '김철수',
            major: '컴퓨터 과학',
            isLeader: false,
          },
          {
            id: 202012345,
            name: '이영희',
            major: '수학',
            isLeader: false,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 120,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 4,
      teamName: '팀 베타',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/woowacourse-teams/2023-emmsale',
      teamMembers: {
        DEVELOPER: [
          {
            id: 3,
            name: '박하나',
            major: '공학',
            isLeader: false,
          },
          {
            id: 4,
            name: '최민수',
            major: '물리학',
            isLeader: true,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 95,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 5,
      teamName: '팀 감마',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/gatsbyjs/gatsby-starter-blog',
      teamMembers: {
        DEVELOPER: [
          {
            id: 5,
            name: '정수정',
            major: '데이터 과학',
            isLeader: false,
          },
          {
            id: 6,
            name: '김영준',
            major: '통계학',
            isLeader: true,
          },
        ],
        DESIGNER: [
          {
            id: 1,
            name: '김철수',
            major: '컴퓨터 과학',
            isLeader: true,
          },
          {
            id: 2,
            name: '이영희',
            major: '수학',
            isLeader: false,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 120,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 6,
      teamName: '팀 베타',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/blueimp/JavaScript-Templates/blob/master/README.md',
      teamMembers: {
        DEVELOPER: [
          {
            id: 3,
            name: '박하나',
            major: '공학',
            isLeader: false,
          },
          {
            id: 4,
            name: '최민수',
            major: '물리학',
            isLeader: true,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 95,
      prize: 'GRAND_PRIZE',
    },
    {
      id: 7,
      teamName: '팀 감마',
      projectTitle: 'ㅁㅁㅁ서비스',
      githubUrl: 'https://github.com/team-gamma',
      teamMembers: {
        DEVELOPER: [
          {
            id: 5,
            name: '정수정',
            major: '데이터 과학',
            isLeader: false,
          },
          {
            id: 6,
            name: '김영준',
            major: '통계학',
            isLeader: true,
          },
        ],
      },
      thumbnailImage: 'https://www.pusan.ac.kr/_contents/eng/_Img/Content/sym_pic1.png',
      voteCount: 85,
      prize: 'GRAND_PRIZE',
    },
    // 필요한 경우 더 많은 팀 데이터를 추가할 수 있습니다.
  ],
};

export const mockHackathonPrize = [
  {
    id: 1,
    name: '대상',
    rank: 1,
    teams: [{ name: 'A팀', memberCount: 4, work: '어린이를 위한 안전한 길찾기앱' }],
  },
  {
    id: 2,
    name: '최우수상',
    rank: 2,
    teams: [{ name: 'B팀', memberCount: 5, work: '딥러닝 기반 상점 내 실시간 빈자리 정보제공 앱' }],
  },
  {
    id: 3,
    name: '우수상',
    rank: 3,
    teams: [
      { name: 'C팀', memberCount: 3, work: '온디바이스 기반 청각장애인용 AI자막앱' },
      { name: 'D팀', memberCount: 4, work: '뉴스레터 구독 관리 및 구독패턴 분석을 통한 큐레이팅 앱' },
    ],
  },
  {
    id: 4,
    name: '장려상',
    rank: 4,
    teams: [
      { name: 'e팀', memberCount: 3, work: '아마추어 및 일반인 뮤지션을 위한 협업 중심 커뮤니티 플랫폼' },
      { name: 'f팀', memberCount: 4, work: '글창작을 위한 글감 자료 관리 및 도식화를 제공하는 프로그램' },
      { name: 'g팀', memberCount: 3, work: '장애아동 발달지원 관리를 위한 통합 플랫폼' },
      { name: 'h팀', memberCount: 4, work: '일반투자자를 위한 투자전략 및 테스팅을 제공하는 플랫폼' },
    ],
  },
];
