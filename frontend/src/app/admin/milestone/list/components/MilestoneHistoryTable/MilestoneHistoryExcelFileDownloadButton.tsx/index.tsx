'use client';

import { useMilestoneHistoryExcelFileQuery } from '@/lib/hooks/useAdminApi';
import { useMemo } from 'react';

interface MilestoneHistoryExcelFileDownloadButtonProps {
  field: number | null;
  keyword: string | null;
}

const MilestoneHistoryExcelFileDownloadButton = ({ field, keyword }: MilestoneHistoryExcelFileDownloadButtonProps) => {
  const { data: excelFile } = useMilestoneHistoryExcelFileQuery(field, keyword);
  const excelFileUrl = useMemo(() => {
    if (excelFile) {
      return URL.createObjectURL(excelFile);
    }
    return '';
  }, [excelFile]);

  return (
    <a
      className="rounded-sm bg-admin-primary-main px-4 py-2 text-white hover:bg-admin-primary-dark"
      href={excelFileUrl}
      download={'마일스톤_실적_내역_목록.xlsx'}
    >
      Excel로 다운로드
    </a>
  );
};

export default MilestoneHistoryExcelFileDownloadButton;
