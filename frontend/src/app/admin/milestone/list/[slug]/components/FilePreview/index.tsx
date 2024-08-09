'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { HistoryFileType } from '@/data/milestone';
import { useFileQuery } from '@/lib/hooks/useApi';
import { getFileType } from '@/lib/utils/utils';

interface FilePreviewProps {
  fileName: string | null;
}

const FilePreview = ({ fileName }: FilePreviewProps) => {
  const { data: file } = useFileQuery(fileName);
  const fileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }, [file]);
  switch (getFileType(fileName)) {
    case HistoryFileType.PDF:
      return (
        <>
          <a className="w-full rounded-sm bg-admin-primary-main text-white" href={fileUrl} download>
            다운로드
          </a>
          <embed
            src={fileUrl}
            type="application/pdf"
            className="h-full w-full"
            style={{ height: '100%', minHeight: '800px' }}
          />
        </>
      );
    case HistoryFileType.IMAGE:
      return (
        <>
          <a className="w-full rounded-sm bg-admin-primary-main text-white" href={fileUrl} download>
            다운로드
          </a>
          <Image src={fileUrl} priority={false} layout="responsive" alt={fileName ?? ''} width={532} height={532} />
        </>
      );
    case HistoryFileType.EMPTY:
      return <div>첨부된 파일이 없습니다.</div>;
    default:
      return <div>잘못된 유형의 파일이 첨부되어 있습니다.</div>;
  }
};

export default FilePreview;
