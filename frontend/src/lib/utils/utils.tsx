/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

import { HistoryFileType, MilestoneGroup, MilestoneHistoryStatus } from '@/data/milestone';

// 빈 파라미터를 제거하는 유틸함수
export const removeEmptyField = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined || v === '') {
        return false;
      }
      if (Array.isArray(v) && v.length === 0) {
        return false;
      }
      return true;
    }),
  ) as T;

export const convertMilestoneGroup = (group: string) => {
  switch (group) {
    case MilestoneGroup.ACTIVITY:
      return '실전적';
    case MilestoneGroup.GLOBAL:
      return '글로벌';
    case MilestoneGroup.COMMUNITY:
      return '커뮤니티';
    default:
      return '기타';
  }
};

export const convertMilestoneHistoryStatus = (status: string) => {
  switch (status) {
    case MilestoneHistoryStatus.PENDING:
      return '미처리';
    case MilestoneHistoryStatus.APPROVED:
      return '승인';
    case MilestoneHistoryStatus.REJECTED:
      return '반려';
    default:
      return '유효하지 않은 상태';
  }
};

export const convertNumToCareer = (num: number) => {
  switch (num) {
    case 1:
      return 'GRADUATE_SCHOOL';
    case 2:
      return 'EMPLOYMENT_COMPANY';
    case 3:
      return 'EMPLOYMENT_PUBLIC_INSTITUTION';
    case 4:
      return 'FOUNDATION';
    default:
      return 'ETC';
  }
};

export const convertCareerToStr = (enumValue: string) => {
  switch (enumValue) {
    case 'GRADUATE_SCHOOL':
      return '대학원 진학';
    case 'EMPLOYMENT_COMPANY':
      return '취업(기업체)';
    case 'EMPLOYMENT_PUBLIC_INSTITUTION':
      return '취업(공공기관)';
    case 'FOUNDATION':
      return '취업(창업)';
    default:
      return '기타';
  }
};

export const appendDashPhoneNumber = (value: string): string => {
  const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return formattedValue;
};

export const compareByIdAsc = <T extends { id: number }>(a: T, b: T): number => {
  if (a.id > b.id) return 1;
  return -1;
};

export const getFileType = (fileName: string | null): HistoryFileType => {
  const extension = fileName?.split('.').pop()?.toLowerCase() ?? null;

  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return HistoryFileType.IMAGE;
    case 'pdf':
      return HistoryFileType.PDF;
    case null:
    case '':
      return HistoryFileType.EMPTY;
    default:
      return HistoryFileType.NOT_SUPPORTED;
  }
};
