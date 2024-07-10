/* eslint-disable implicit-arrow-linebreak */
import { MilestoneHistoryStatus } from '@/data/milestone';
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosMutation, useAxiosQuery } from '@/lib/hooks/useAxios';
import {
  CollegeDto,
  MilestoneHistoryOfStudentResponseDto,
  MilestoneOverviewDto,
  MilestoneScoreDto,
  MilestoneHistoryCreateDto,
} from '@/types/common.dto';
import { BusinessError } from '@/types/error';

import { removeEmptyField } from '../utils/utils';

export const useCollegeQuery = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegeDto[] | null> => {
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

export const useMajorQuery = (collegeId: number) =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegeDto[] | null> => {
      try {
        const response = await client.get(`/colleges/${collegeId}/majors`);
        return response.data;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  });

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
    queryFn: async (): Promise<MilestoneHistoryOfStudentResponseDto[]> => {
      const response = await client.get(`/milestones/histories/members/${memberId}`, {
        params: removeEmptyField({ start_date: startDate, end_date: endDate, filter }),
      });
      return response?.data;
    },
  });

export function useMilestoneQuery() {
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONES,
    queryFn: async (): Promise<MilestoneOverviewDto[]> => {
      const response = await client.get('/milestones');
      return response.data;
    },
  });
}

export function useMilestoneHistoryCreateMutation() {
  return useAxiosMutation({
    mutationFn: async ({ milestoneId, description, count, file, activatedAt }: MilestoneHistoryCreateDto) => {
      const formdata = new FormData();
      formdata.append('file', file!);
      const blob = new Blob([JSON.stringify({ milestoneId, description, count, activatedAt })], {
        type: 'application/json',
      });
      formdata.append('request', blob);
      await client.post('/milestones/histories', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  });
}

export function useMilestoneHistoryDeleteMutation() {
  return useAxiosMutation({
    mutationFn: async (id: number) => {
      await client.delete(`/milestones/histories/${id}`);
    },
  });
}
