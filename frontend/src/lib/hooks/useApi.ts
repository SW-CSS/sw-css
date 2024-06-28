import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosQuery } from '@/lib/hooks/useAxios';
import {
  CollegesResponseDto,
  MilestoneHistoryOfStudentResponseDto,
  MilestoneScoreOfStudentResponseDto,
} from '@/types/dto';
import { BusinessError } from '@/types/error';

export function useColleges() {
  return useAxiosQuery({
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
}

interface MilestoneScoreOfStudentProps {
  memberId: number;
  startDate: string;
  endDate: string;
}

export function useMilestoneScoresOfStudent({ memberId, startDate, endDate }: MilestoneScoreOfStudentProps) {
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT,
    queryFn: async (): Promise<MilestoneScoreOfStudentResponseDto[] | null> => {
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
}

interface MilestoneHistoriesOfStudentProps {
  memberId: number;
}

export function useMilestoneHistoriesOfStudent({ memberId }: MilestoneHistoriesOfStudentProps) {
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT,
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
}
