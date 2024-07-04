/* eslint-disable implicit-arrow-linebreak */
import { MilestoneHistoryStatus } from '@/data/milestone';
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosMutation, useAxiosQuery } from '@/lib/hooks/useAxios';
import { CollegesResponseDto, MilestoneHistoryOfStudentResponseDto, MilestoneScoreDto } from '@/types/common.dto';

import { removeEmptyField } from '../utils/utils';

export const useCollegesQuery = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegesResponseDto[] | null> => {
      const response = await client.get('/colleges');
      return response?.data;
    },
  }) ?? [];

export const useMilestoneScoresOfStudentQuery = (memberId: number, startDate: string, endDate: string) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneScoreDto[] | null> => {
      const response = await client.get(
        `/milestones/histories/scores/members/${memberId}?start_date=${startDate}&end_date=${endDate}`,
      );
      return response?.data;
    },
  });

export const useMilestoneHistoriesOfStudentQuery = (
  memberId: number,
  startDate: string | undefined = undefined,
  endDate: string | undefined = undefined,
  filter: MilestoneHistoryStatus | undefined = undefined,
) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(memberId, startDate, endDate, filter),
    queryFn: async (): Promise<MilestoneHistoryOfStudentResponseDto[] | null> => {
      const response = await client.get(`/milestones/histories/members/${memberId}`, {
        params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }),
      });
      return response?.data;
    },
  });

export function useMilestoneHistoryDeleteMutation() {
  return useAxiosMutation({
    mutationFn: async (id: number) => {
      await client.delete(`/milestones/histories/${id}`);
    },
  });
}
