/* eslint-disable implicit-arrow-linebreak */
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosQuery } from '@/lib/hooks/useAxios';
import { CollegesResponseDto, MilestoneHistoryOfStudentResponseDto, MilestoneScoreDto } from '@/types/common.dto';
import { MilestoneHistoriesOfStudentQuery, MilestoneScoresOfStudentQuery } from '@/types/request.dto';

import { removeEmptyField } from '../utils/utils';

export const useCollegesQuery = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegesResponseDto[] | null> => {
      const response = await client.get('/colleges');
      return response?.data;
    },
  }) ?? [];

export const useMilestoneScoresOfStudentQuery = ({ memberId, startDate, endDate }: MilestoneScoresOfStudentQuery) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT({ memberId, startDate, endDate }),
    queryFn: async (): Promise<MilestoneScoreDto[] | null> => {
      const response = await client.get(
        `/milestones/histories/scores/members/${memberId}?start_date=${startDate}&end_date=${endDate}`,
      );
      return response?.data;
    },
  });

export const useMilestoneHistoriesOfStudentQuery = ({
  memberId,
  startDate,
  endDate,
  filter,
}: MilestoneHistoriesOfStudentQuery) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT({ memberId, startDate, endDate, filter }),
    queryFn: async (): Promise<MilestoneHistoryOfStudentResponseDto[]> => {
      const response = await client.get(`/milestones/histories/members/${memberId}`, {
        params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }),
      });
      return response?.data;
    },
  });
