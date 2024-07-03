import { MilestoneHistoryStatus } from '@/data/milestone';
import { server } from '@/lib/api/server.axios';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';

import { removeEmptyField } from '../utils/utils';

export async function getMilestoneHistoriesOfStudent({
  memberId,
  startDate,
  endDate,
  filter,
}: {
  memberId: number;
  startDate?: string;
  endDate?: string;
  filter?: MilestoneHistoryStatus;
}) {
  const response = await server.get<MilestoneHistoryOfStudentResponseDto[]>(
    `/milestones/histories/members/${memberId}`,
    { params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }) },
  );
  return response?.data;
}
