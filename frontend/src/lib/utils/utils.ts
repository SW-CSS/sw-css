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
