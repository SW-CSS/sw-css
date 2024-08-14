import { MilestoneHistoryStatus } from '@/data/milestone';
import { server } from '@/lib/api/server.axios';
import {
  HackathonPageableDto,
  MilestoneHistoryDto,
  MilestoneHistoryOfStudentPageableDto,
  MilestoneHistoryPageableDto,
} from '@/types/common.dto';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import { removeEmptyField } from '../utils/utils';

export async function getMilestoneHistoriesOfStudent(
  memberId: number,
  startDate: string | undefined = undefined,
  endDate: string | undefined = undefined,
  filter: MilestoneHistoryStatus | undefined = undefined,
  sortBy: MilestoneHistorySortCriteria | undefined = undefined,
  sortDirection: SortDirection | undefined = undefined,
  page: number = 0,
  size: number = 10,
) {
  const response = await server.get<MilestoneHistoryOfStudentPageableDto>(`/milestones/histories/members/${memberId}`, {
    params: removeEmptyField({
      start_date: startDate,
      end_date: endDate,
      filter,
      sort_by: sortBy,
      sort_direction: sortDirection,
      page,
      size,
    }),
  });
  return response?.data;
}

export async function getMilestoneHistories(field?: number, keyword?: string, page: number = 0, size: number = 10) {
  const response = await server.get<MilestoneHistoryPageableDto>('/admin/milestones/histories', {
    params: removeEmptyField({
      field,
      keyword,
      page,
      size,
    }),
  });
  return response?.data;
}

export async function getMilestoneHistory(historyId: number) {
  const response = await server.get<MilestoneHistoryDto>(`/admin/milestones/histories/${historyId}`);
  return response?.data;
}

export async function getFile(fileName: string | null) {
  const response = await server.get<Blob>(`/files/${fileName}`, {
    responseType: 'blob',
  });
  return response.data;
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
        thumbnailImageName: 'ug0sO16.png',
      },
      {
        id: 2,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        thumbnailImageName: 'hackathon_1.jpg',
      },
      {
        id: 3,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        thumbnailImageName: 'hackathon_1.jpg',
      },
      {
        id: 4,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        thumbnailImageName: 'hackathon_1.jpg',
      },
      {
        id: 5,
        name: 'Hackathon 1',
        description: 'Hackathon 1 Description',
        applyStartDate: '2022-01-01',
        applyEndDate: '2022-01-31',
        hackathonStartDate: '2022-01-01',
        hackathonEndDate: '2022-01-31',
        thumbnailImageName: 'hackathon_1.jpg',
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
