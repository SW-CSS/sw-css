/* eslint-disable implicit-arrow-linebreak */
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosMutation, useAxiosQuery } from '@/lib/hooks/useAxios';
import { MilestoneScoreOfStudentPageableDto } from '@/types/common.dto';
import { BusinessError } from '@/types/error';
import { useAppSelector } from './redux';
import { headerInfos } from '@/data/clientCategory';
import { stat } from 'fs';

export function useMilestoneHistoryExcelFileQuery(field: number | null, keyword: string | null) {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORY_EXCEL(field, keyword),
    queryFn: async (): Promise<Blob | null> => {
      const response = await client.get(`/admin/milestones/histories/files`, {
        params: { keyword, field },
        responseType: 'blob',
        headers: { Authorization: auth.token },
      });
      if (response?.status !== 200) {
        return null;
      }
      return response?.data;
    },
  });
}

export const useMilestoneScoresQuery = (
  startDate: string,
  endDate: string,
  page: number | undefined,
  size: number | undefined,
) => {
  const auth = useAppSelector((state) => state.auth).value;
  return (
    useAxiosQuery({
      queryKey: QueryKeys.MILESTONE_SCORES(startDate, endDate, page, size),
      queryFn: async (): Promise<MilestoneScoreOfStudentPageableDto | null> => {
        try {
          const response = await client.get('/admin/milestones/histories/scores', {
            params: { start_date: startDate, end_date: endDate, page: page ?? 0, size: size ?? 10 },
            headers: { Authorization: auth.token },
          });
          return response.data;
        } catch (error) {
          if (error instanceof BusinessError) {
            return null;
          }
          throw error;
        }
      },
    }) ?? []
  );
};

export function useMilestoneHistoryScoreExcelFileQuery(startDate: string, endDate: string) {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORY_SCORE_EXCEL(startDate, endDate),
    queryFn: async (): Promise<Blob | null> => {
      const response = await client.get(`/admin/milestones/histories/scores/files`, {
        params: { start_date: startDate, end_date: endDate },
        responseType: 'blob',
        headers: { Authorization: auth.token },
      });
      if (response?.status !== 200) {
        return null;
      }
      return response?.data;
    },
  });
}

export const useMilestoneHistoryStatusApproveMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;

  return useAxiosMutation({
    mutationFn: async (historyId: number) => {
      await client.patch(
        `/admin/milestones/histories/${historyId}/approve`,
        {},
        {
          headers: { Authorization: auth.token },
        },
      );
    },
  });
};

export const useMilestoneHistoryStatusRejectMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async ({ historyId, rejectReason }: { historyId: number; rejectReason: string }) => {
      await client.patch(
        `/admin/milestones/histories/${historyId}/reject`,
        {
          reason: rejectReason,
        },
        {
          headers: { Authorization: auth.token },
        },
      );
    },
  });
};

export const useMilestoneHistoryStatusCancelMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async (historyId: number) => {
      await client.patch(
        `/admin/milestones/histories/${historyId}/cancel`,
        {},
        {
          headers: { Authorization: auth.token },
        },
      );
    },
  });
};

export const useRegisterHistoryInBatchMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async (file?: File) => {
      const formdata = new FormData();
      formdata.append('file', file!);
      await client.post('/admin/milestones/histories', formdata, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: auth.token },
      });
    },
  });
};

export const useRegisterFacultyMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async ({ email, name }: { email: string; name: string }) => {
      await client.post(
        '/admin/auth',
        { email: email + '@pusan.ac.kr', name },
        {
          headers: { Authorization: auth.token },
        },
      );
    },
  });
};

export const useRegisterFacultiesByFileMutation = () => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async (file?: File) => {
      const formData = new FormData();
      formData.append('file', file!);
      await client.post('/admin/auth/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: auth.token },
      });
    },
  });
};
