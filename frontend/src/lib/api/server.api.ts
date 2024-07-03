import { server } from '@/lib/api/server.axios';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';
import { MilestoneHistoriesOfStudentQuery } from '@/types/request.dto';

import { removeEmptyField } from '../utils/utils';

export async function getMilestoneHistoriesOfStudent({
  memberId,
  startDate,
  endDate,
  filter,
}: MilestoneHistoriesOfStudentQuery) {
  const response = await server.get<MilestoneHistoryOfStudentResponseDto[]>(
    `/milestones/histories/members/${memberId}`,
    { params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }) },
  );
  return response?.data;
}
