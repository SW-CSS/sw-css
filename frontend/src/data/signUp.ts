export const careerCategory: { id: number; name: string; type: string }[] = [
  { id: 1, name: '대학원 진학', type: 'GRADUATE_SCHOOL' },
  { id: 2, name: '기업 취업', type: 'EMPLOYMENT_COMPANY' },
  { id: 3, name: '공공기관 취업', type: 'EMPLOYMENT_PUBLIC_INSTITUTION' },
  { id: 4, name: '창업', type: 'FOUNDATION' },
];

export enum SignUpPhase {
  one,
  two,
}
