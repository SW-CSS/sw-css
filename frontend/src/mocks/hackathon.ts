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
      name: 'Team Alpha',
      githubUrl: 'https://github.com/team-alpha',
      teamMembers: [
        {
          id: 1,
          name: 'Alice Smith',
          majorName: 'Computer Science',
          role: 'Developer',
          isLeader: true,
        },
        {
          id: 2,
          name: 'Bob Johnson',
          majorName: 'Mathematics',
          role: 'Designer',
          isLeader: false,
        },
      ],
      thumbnailImageName: 'team-alpha-thumbnail.png',
      voteCount: 120,
    },
    {
      name: 'Team Beta',
      githubUrl: 'https://github.com/team-beta',
      teamMembers: [
        {
          id: 3,
          name: 'Carol White',
          majorName: 'Engineering',
          role: 'Developer',
          isLeader: false,
        },
        {
          id: 4,
          name: 'Dave Brown',
          majorName: 'Physics',
          role: 'Project Manager',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'team-beta-thumbnail.png',
      voteCount: 95,
    },
    {
      name: 'Team Gamma',
      githubUrl: 'https://github.com/team-gamma',
      teamMembers: [
        {
          id: 5,
          name: 'Eve Davis',
          majorName: 'Data Science',
          role: 'Data Analyst',
          isLeader: false,
        },
        {
          id: 6,
          name: 'Frank Wilson',
          majorName: 'Statistics',
          role: 'Developer',
          isLeader: true,
        },
      ],
      thumbnailImageName: 'team-gamma-thumbnail.png',
      voteCount: 85,
    },
    // 필요한 경우 더 많은 팀 데이터를 추가할 수 있습니다.
  ],
};
