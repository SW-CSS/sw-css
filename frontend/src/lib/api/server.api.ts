import { MilestoneHistoryStatus } from '@/data/milestone';
import { server } from '@/lib/api/server.axios';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';

import { removeEmptyField } from '../utils/utils';

export async function getMilestoneHistoriesOfStudent(
  memberId: number,
  startDate: string | undefined = undefined,
  endDate: string | undefined = undefined,
  filter: MilestoneHistoryStatus | undefined = undefined,
) {
  const response = await server.get<MilestoneHistoryOfStudentResponseDto[]>(
    `/milestones/histories/members/${memberId}`,
    { params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }) },
  );
  return response?.data;
}
