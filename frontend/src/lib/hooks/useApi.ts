/* eslint-disable implicit-arrow-linebreak */
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosQuery } from '@/lib/hooks/useAxios';
import { CollegesResponseDto, MilestoneHistoryOfStudentResponseDto, MilestoneScoreDto } from '@/types/common.dto';

export const useColleges = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegesResponseDto[] | null> => {
      const response = await client.get('/colleges');
      return response?.data;
    },
  }) ?? [];

interface MilestoneInformationOfStudentProps {
  memberId: number;
  startDate: string;
  endDate: string;
}

export const useMilestoneScoresOfStudent = ({ memberId, startDate, endDate }: MilestoneInformationOfStudentProps) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneScoreDto[] | null> => {
      const response = await client.get(
        `/milestones/histories/scores/members/${memberId}?start_date=${startDate}&end_date=${endDate}`,
      );
      return response?.data;
    },
  });

export const useMilestoneHistoriesOfStudent = ({ memberId, startDate, endDate }: MilestoneInformationOfStudentProps) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneHistoryOfStudentResponseDto[] | null> => {
      const response = await client.get(`/milestones/histories/members/${memberId}`);
      return response?.data;
    },
  });
