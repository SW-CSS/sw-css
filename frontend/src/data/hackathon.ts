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

export enum HackathonState {
  UPCOMING = '예정',
  IN_PROGRESS = '진행중',
  COMPLETED = '종료',
}

export enum HackathonPrizeType {
  GRAND_PRIZE = 'GRAND_PRIZE',
  EXCELLENCE_PRIZE = 'EXCELLENCE_PRIZE',
  MERIT_PRIZE = 'MERIT_PRIZE',
  ENCOURAGEMENT_PRIZE = 'ENCOURAGEMENT_PRIZE',
  NONE_PRIZE = 'NONE',
}

export const hackathonPrizeType = [
  { id: HackathonPrizeType.NONE_PRIZE, name: '' },
  { id: HackathonPrizeType.GRAND_PRIZE, name: '대상' },
  { id: HackathonPrizeType.EXCELLENCE_PRIZE, name: '최우수상' },
  { id: HackathonPrizeType.MERIT_PRIZE, name: '우수상' },
  { id: HackathonPrizeType.ENCOURAGEMENT_PRIZE, name: '장려상' },
];

export const hackathonPrizeCategories = [
  { id: -1, prize: HackathonPrizeType.NONE_PRIZE, name: 'X' },
  { id: 1, prize: HackathonPrizeType.GRAND_PRIZE, name: '대상' },
  { id: 2, prize: HackathonPrizeType.EXCELLENCE_PRIZE, name: '최우수상' },
  { id: 3, prize: HackathonPrizeType.MERIT_PRIZE, name: '우수상' },
  { id: 4, prize: HackathonPrizeType.ENCOURAGEMENT_PRIZE, name: '장려상' },
];

export function prizeNumberToString(prizeId: number) {
  for (const { id, prize, name } of hackathonPrizeCategories) {
    if (id === prizeId) return prize;
  }
  return 'NONE';
}

export function prizeStringToNumber(selectedPrize: string) {
  for (const { id, prize, name } of hackathonPrizeCategories) {
    if (prize === selectedPrize) return id;
  }
  return -1;
}
