/* eslint-disable implicit-arrow-linebreak */
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosMutation, useAxiosQuery } from '@/lib/hooks/useAxios';
import { MilestoneScoreOfStudentPageableDto } from '@/types/common.dto';
import { BusinessError } from '@/types/error';

export const useMilestoneScoresQuery = (
  startDate: string,
  endDate: string,
  page: number | undefined,
  size: number | undefined,
) =>
  useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES(startDate, endDate, page, size),
    queryFn: async (): Promise<MilestoneScoreOfStudentPageableDto | null> => {
      try {
        const response = await client.get('/admin/milestones/histories/scores', {
          params: { start_date: startDate, end_date: endDate, page: page ?? 0, size: size ?? 10 },
        });
        return response.data;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  }) ?? [];

export const useMilestoneHistoryStatusApproveMutation = () =>
  useAxiosMutation({
    mutationFn: async (historyId: number) => {
      await client.patch(`/admin/milestones/histories/${historyId}/approve`);
    },
  });

export const useMilestoneHistoryStatusRejectMutation = () =>
  useAxiosMutation({
    mutationFn: async ({ historyId, rejectReason }: { historyId: number; rejectReason: string }) => {
      await client.patch(`/admin/milestones/histories/${historyId}/reject`, { data: { rejectReason } });
    },
  });

export const useMilestoneHistoryStatusCancelMutation = () =>
  useAxiosMutation({
    mutationFn: async (historyId: number) => {
      await client.patch(`/admin/milestones/histories/${historyId}/cancel`);
    },
  });
