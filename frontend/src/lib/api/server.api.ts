import { MilestoneHistoryStatus } from '@/data/milestone';
import { server } from '@/lib/api/server.axios';
import {
  FacultyMemberPageableDto,
  HackathonInformationDto,
  HackathonPageableDto,
  HackathonPrizeDto,
  MilestoneHistoryDto,
  MilestoneHistoryOfStudentPageableDto,
  MilestoneHistoryPageableDto,
  MilestoneScoreDto,
} from '@/types/common.dto';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import { mockHackathonPrize } from '@/mocks/hackathon';
import { removeEmptyField } from '../utils/utils';
import { BusinessError } from '@/types/error';

export async function getMilestoneHistoriesOfStudent(
  token: string,
  memberId: number,
  startDate: string | undefined = undefined,
  endDate: string | undefined = undefined,
  filter: MilestoneHistoryStatus | undefined = undefined,
  sortBy: MilestoneHistorySortCriteria | undefined = undefined,
  sortDirection: SortDirection | undefined = undefined,
  page: number = 0,
  size: number = 10,
) {
  return await server
    .get<MilestoneHistoryOfStudentPageableDto>(`/milestones/histories/members/${memberId}`, {
      headers: { Authorization: token },
      params: removeEmptyField({
        start_date: startDate,
        end_date: endDate,
        filter,
        sort_by: sortBy,
        sort_direction: sortDirection,
        page,
        size,
      }),
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export async function getMilestoneHistories(
  token: string,
  field?: number,
  keyword?: string,
  page: number = 0,
  size: number = 10,
) {
  return await server
    .get<MilestoneHistoryPageableDto>('/admin/milestones/histories', {
      headers: { Authorization: token },
      params: removeEmptyField({
        field,
        keyword,
        page,
        size,
      }),
    })
    .then((res) => res.data)
    .catch((err) => {
      location.replace('/sign-out');
      return Promise.reject(err);
    });
}

export async function getMilestoneHistory(historyId: number, token: string) {
  return await server
    .get<MilestoneHistoryDto>(`/admin/milestones/histories/${historyId}`, { headers: { Authorization: token } })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export async function getValidationStudentId(studentId: string) {
  return await server
    .get(`/sign-up/exists/student-id`, {
      params: removeEmptyField({
        student_id: studentId,
      }),
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export async function getMyMilestoneHistory(token: string, studentId: number, startDate: string, endDate: string) {
  const response = await server
    .get<MilestoneScoreDto[]>(`/milestones/histories/scores/members/${studentId}`, {
      headers: { Authorization: token },
      params: removeEmptyField({
        start_date: startDate,
        end_date: endDate,
      }),
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

  return response;
}

export async function getHackathons(page: number = 0, size: number = 10) {
  const response = await server.get<HackathonPageableDto>('/hackathons', {
    params: removeEmptyField({
      page,
      size,
    }),
  });
  // TODO : API 구현
  //return response?.data;
  return {
    content: [
      {
        id: 1,
        name: '제5회 창의융합SW해커톤',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        bannerImageName: 'test1.jpeg',
      },
      {
        id: 2,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        bannerImageName: 'test2.jpeg',
      },
      {
        id: 3,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        bannerImageName: 'test3.png',
      },
      {
        id: 4,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        bannerImageName: 'test1.jpeg',
      },
      {
        id: 5,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        bannerImageName: 'test2.jpeg',
      },
    ],
    empty: false,
    first: true,
    last: false,
    sort: {
      empty: false,
      sorted: false,
      unsorted: true,
    },
    number: 0,
    pageable: '',
    pageSize: 6,
    size: 6,
    totalElements: 8,
    totalPages: 2,
  };
}

export async function getHackathonInformation(hackathonId: number) {
  const response = await server.get<HackathonInformationDto>(`/hackathons/${hackathonId}`);
  // TODO : API 구현
  //return response?.data;
  return {
    name: '제 4회 창의융합 소프트웨어 해커톤',
    content: `
# Heading 1
## Heading 2
### Heading 3

This is a **bold** text with some *italic* and [a link](https://example.com).
- ㅁ렁ㄹㄴㄹ
1. ㄹㄴㅇㄹㅁㄹ
`,
    bannerImageName: 'test1.jpeg',
  };
}

export async function getHackathonPrize(hackathonId: number) {
  const response = await server.get<HackathonPrizeDto[]>(`/hackathons/${hackathonId}/prizes`);
  //TODO : API 구현
  // return response?.data;
  return mockHackathonPrize;
}

export async function getFacultyMembers(
  token: string,
  field?: number,
  keyword?: string,
  page: number = 0,
  size: number = 10,
) {
  return await server
    .get<FacultyMemberPageableDto>('/admin/member/faculties', {
      headers: { Authorization: token },
      params: removeEmptyField({
        field,
        keyword,
        page,
        size,
      }),
    })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}
