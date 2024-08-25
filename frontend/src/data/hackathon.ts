export const hackathonInformationTypes = [
  { name: '공고', path: (slug: number) => `/hackathon/${slug}` },
  { name: '투표', path: (slug: number) => `/hackathon/${slug}/vote` },
  { name: '수상 내역', path: (slug: number) => `/hackathon/${slug}/prize` },
];

export enum TeamMemberRole {
  DEVELOPER = 'DEVELOPER',
  DESIGNER = 'DESIGNER',
  PLANNER = 'PLANNER',
  OTHER = 'OTHER',
}

export const teamMemberRoleInfo = {
  DEVELOPER: { img: '/images/teamBuilding/team_type_img_1.svg', text: '개발자' },
  DESIGNER: { img: '/images/teamBuilding/team_type_img_2.svg', text: '디자이너' },
  PLANNER: { img: '/images/teamBuilding/team_type_img_3.svg', text: '기획자' },
  OTHER: { img: '/images/teamBuilding/team_type_img_4.svg', text: '기타' },
};

export const memberRoleOptions = [
  { id: TeamMemberRole.DEVELOPER, name: '개발자' },
  { id: TeamMemberRole.DESIGNER, name: '디자이너' },
  { id: TeamMemberRole.PLANNER, name: '기획자' },
  { id: TeamMemberRole.OTHER, name: '기타' },
];
