/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */

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

export const convertCareer = (enumValue: string) => {
  switch (enumValue) {
    case 'GRADUATE_SCHOOL':
      return '대학원 진학';
    case 'EMPLOYMENT_COMPANY':
      return '취업(기업체)';
    case 'EMPLOYMENT_PUBLIC_"INSTITUTION':
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
