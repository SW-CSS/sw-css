'use client';

import { useMilestoneHistoryExcelFileQuery } from '@/lib/hooks/useAdminApi';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

interface AdminMilestoneDownloadButtonProps {
  field: number | null;
  keyword: string | null;
}

export default function AdminMilestoneDownloadButton({ field, keyword }: AdminMilestoneDownloadButtonProps) {
  const { data: excelFile } = useMilestoneHistoryExcelFileQuery(field, keyword);
  const excelFileUrl = useMemo(() => {
    if (excelFile) {
      return URL.createObjectURL(excelFile);
    }
    return '';
  }, [excelFile]);

  const handleExcelDownloadButtonClick = () => {
    if (!excelFileUrl) {
      toast.error('파일을 불러오는 데 실패하였습니다.');
      return;
    }
    const a = document.createElement('a');
    a.href = excelFileUrl;
    a.download = '마일스톤_실적_내역_목록.xlsx';
    a.click();
  };

  return (
    <button
      type="button"
      className="rounded-sm bg-admin-primary-main px-4 py-2 text-white hover:bg-admin-primary-dark"
      onClick={handleExcelDownloadButtonClick}
    >
      Excel로 다운로드
    </button>
  );
}
