export const hackathonInformationTypes = [
  { name: '공고', path: (slug: number) => `/hackathon/${slug}` },
  { name: '투표', path: (slug: number) => `/hackathon/${slug}/vote` },
  { name: '수상 내역', path: (slug: number) => `/hackathon/${slug}/prize` },
];
