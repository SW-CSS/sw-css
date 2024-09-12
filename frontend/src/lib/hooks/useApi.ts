/* eslint-disable implicit-arrow-linebreak */
import { FirstInfo } from '@/app/(client)/(auth)/sign-up/components/SignUpFirstPage';
import { SecondInfo } from '@/app/(client)/(auth)/sign-up/components/SignUpSecondPage';
import { MilestoneHistoryStatus } from '@/data/milestone';
import { QueryKeys } from '@/data/queryKey';
import { client } from '@/lib/api/client.axios';
import { useAxiosMutation, useAxiosQuery } from '@/lib/hooks/useAxios';
import {
  CollegeDto,
  HackathonTeamCreateDto,
  HackathonTeamPageableDto,
  MilestoneByGroupDto,
  MilestoneHistoryCreateDto,
  MilestoneHistoryOfStudentPageableDto,
  MilestoneScoreDto,
  StudentMemberDto,
} from '@/types/common.dto';
import { BusinessError } from '@/types/error';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';
import { github } from '../api/github.axios';
import { convertNumToCareer, removeEmptyField } from '../utils/utils';
import { useAppSelector } from './redux';

export const useCollegeQuery = () =>
  useAxiosQuery({
    queryKey: QueryKeys.COLLEGES,
    queryFn: async (): Promise<CollegeDto[] | null> =>
      await client
        .get('/colleges')
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });

export const useMilestoneScoresOfStudentQuery = (memberId: number, startDate: string, endDate: string) => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_SCORES_OF_STUDENT(memberId, startDate, endDate),
    queryFn: async (): Promise<MilestoneScoreDto[]> => {
      return await client
        .get(`/milestones/histories/scores/members/${memberId}`, {
          params: removeEmptyField({
            start_date: startDate,
            end_date: endDate,
          }),
          headers: {
            Authorization: auth.token,
          },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
};

export const useMilestoneHistoriesOfStudentQuery = (
  memberId: number,
  startDate: string | undefined = undefined,
  endDate: string | undefined = undefined,
  filter: MilestoneHistoryStatus | undefined = undefined,
  sortBy: MilestoneHistorySortCriteria | undefined = undefined,
  sortDirection: SortDirection | undefined = undefined,
  page: number = 0,
  size: number = 10,
) => {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONE_HISTORIES_OF_STUDENT(
      memberId,
      startDate,
      endDate,
      filter,
      sortBy,
      sortDirection,
      page,
      size,
    ),
    queryFn: async (): Promise<MilestoneHistoryOfStudentPageableDto> => {
      return await client
        .get(`/milestones/histories/members/${memberId}`, {
          params: removeEmptyField({
            start_date: startDate,
            end_date: endDate,
            filter,
            sort_by: sortBy,
            sort_direction: sortDirection,
            page,
            size,
          }),
          headers: { Authorization: auth.token },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
};

export function useMilestoneQuery() {
  return useAxiosQuery({
    queryKey: QueryKeys.MILESTONES,
    queryFn: async (): Promise<MilestoneByGroupDto> =>
      await client
        .get('/milestones')
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useStudentMemberQuery(memberId: number, options?: { enabled?: boolean }) {
  return useAxiosQuery({
    ...options,
    queryKey: QueryKeys.STUDENT(memberId),
    queryFn: async (): Promise<StudentMemberDto> => await client.get(`/members/${memberId}`),
  });
}

export function useStudentMemberMutation() {
  return useAxiosMutation({
    mutationFn: async (memberId: number): Promise<StudentMemberDto | null> =>
      await client
        .get<StudentMemberDto>(`/members/${memberId}`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useStudentMembersQuery() {
  return useAxiosQuery({
    queryKey: QueryKeys.STUDENTS,
    queryFn: async (): Promise<StudentMemberDto[]> =>
      await client
        .get('/admin/members')
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useFileQuery(fileName: string | null) {
  return useAxiosQuery({
    queryKey: QueryKeys.FILE(fileName),
    queryFn: async (): Promise<Blob | null> =>
      await client
        .get(`/files/${fileName}`, { responseType: 'blob' })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useHackathonTeamsQuery(
  hackathonId: number,
  page: number = 0,
  size: number = 10,
  options?: { enabled?: boolean },
) {
  return useAxiosQuery({
    ...options,
    queryKey: QueryKeys.HACKATHON_TEAMS(hackathonId, page, size),
    queryFn: async (): Promise<HackathonTeamPageableDto> =>
      await client
        .get(`/hackathons/${hackathonId}/teams`)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useGithubReadmeQuery(owner: string, repo: string, options?: { enabled?: boolean }) {
  return useAxiosQuery({
    queryKey: QueryKeys.GITHUB_README(repo, repo),
    queryFn: async (): Promise<string | null> => {
      try {
        const response = await github.get(`/repos/${owner}/${repo}/readme`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });
        const binaryString = atob(response.data.content);
        const bytes = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedContent = new TextDecoder('utf-8').decode(bytes);
        return decodedContent;
      } catch (error) {
        if (error instanceof BusinessError) {
          return null;
        }
        throw error;
      }
    },
  });
}

export function useMilestoneHistoryCreateMutation() {
  const auth = useAppSelector((state) => state.auth).value;

  return useAxiosMutation({
    mutationFn: async ({ milestoneId, description, count, file, activatedAt }: MilestoneHistoryCreateDto) => {
      const formData = new FormData();
      formData.append('file', file!);
      const blob = new Blob([JSON.stringify({ milestoneId, description, count, activatedAt })], {
        type: 'application/json',
      });
      formData.append('request', blob);

      return await client
        .post('/milestones/histories', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: auth.token },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
}

export function useMilestoneHistoryDeleteMutation() {
  const auth = useAppSelector((state) => state.auth).value;
  return useAxiosMutation({
    mutationFn: async (id: number) => {
      return await client
        .delete(`/milestones/histories/${id}`, { headers: { Authorization: auth.token } })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
}

export function useRegisterTeamMutation() {
  return useAxiosMutation({
    mutationFn: async ({ hackathonId, image, name, work, githubUrl, members, password }: HackathonTeamCreateDto) => {
      const formData = new FormData();
      formData.append('image', image!);
      const blob = new Blob([JSON.stringify({ name, work, githubUrl, members, password })], {
        type: 'application/json',
      });
      formData.append('request', blob);

      return await client
        .post(`/hackathons/${hackathonId}/teams`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
}

export function useSignUpMutation() {
  return useAxiosMutation({
    mutationFn: async (userInfo: FirstInfo & SecondInfo) => {
      const data = {
        email: userInfo.email + '@pusan.ac.kr',
        password: userInfo.password,
        name: userInfo.name,
        student_id: userInfo.studentId,
        phone_number: userInfo.phoneNumber,
        major_id: userInfo.majorId,
        minor_id: userInfo.minorId === 0 ? null : userInfo.minorId,
        double_major_id: userInfo.doubleMajorId === 0 ? null : userInfo.doubleMajorId,
        career: convertNumToCareer(userInfo.career),
        career_detail: userInfo.careerDetail,
        auth_code: userInfo.authCode,
      };

      return await client
        .post(`/sign-up`, data)
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
    },
  });
}

export function useSendAuthCodeMutation() {
  return useAxiosMutation({
    mutationFn: async (email: string) =>
      await client
        .post(`/sign-up/send-auth-code`, { email })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useSignInMutation() {
  return useAxiosMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      await client
        .post(`/sign-in`, { email: email + '@pusan.ac.kr', password })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}

export function useResetPasswordMutation() {
  return useAxiosMutation({
    mutationFn: async ({ email, name }: { email: string; name: string }) =>
      await client
        .patch(`/sign-in/reset-password`, { email: email + '@pusan.ac.kr', name })
        .then((res) => res.data)
        .catch((err) => Promise.reject(err)),
  });
}
