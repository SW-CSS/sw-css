/* eslint-disable implicit-arrow-linebreak */
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosQuery } from '@/lib/hooks/useAxios';
import { CollegesResponseDto, MilestoneHistoryOfStudentResponseDto, MilestoneScoreDto } from '@/types/common.dto';
import { BusinessError } from '@/types/error';

export const useColleges = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegesResponseDto[] | null> => {
      try {
        const response = await client.get('/colleges');
        return response.data;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  });

interface MilestoneScoreOfStudentProps {
  memberId: number;
  startDate: string;
  endDate: string;
}

export const useMilestoneScoresOfStudent = ({ memberId, startDate, endDate }: MilestoneScoreOfStudentProps) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneScoreDto[] | null> => {
      try {
        const response = await client.get(
          `/milestones/histories/scores/members/${memberId}?start_date=${startDate}&end_date=${endDate}`,
        );
        return response.data;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  });

interface MilestoneHistoriesOfStudentProps {
  memberId: number;
  startDate: string;
  endDate: string;
}

export const useMilestoneHistoriesOfStudent = ({ memberId, startDate, endDate }: MilestoneHistoriesOfStudentProps) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneHistoryOfStudentResponseDto[] | null> => {
      try {
        const response = await client.get(`/milestones/histories/members/${memberId}`);
        return response.data;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  });
