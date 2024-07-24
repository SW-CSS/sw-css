import { MilestoneHistoryStatus } from '@/data/milestone';
import { server } from '@/lib/api/server.axios';
import {
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
