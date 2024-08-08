'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { useFileQuery } from '@/lib/hooks/useApi';

interface FilePreviewProps {
  fileName: string | null;
}

enum FileType {
  IMAGE = 'image',
  PDF = 'pdf',
  EMPTY = 'empty',
  UNKNOWN = 'unknown',
}

const getFileType = (fileName: string | null): FileType => {
  const extension = fileName?.split('.').pop()?.toLowerCase() ?? null;

  switch (extension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return FileType.IMAGE;
    case 'pdf':
      return FileType.PDF;
    case null:
    case '':
      return FileType.EMPTY;
    default:
      return FileType.UNKNOWN;
  }
};

const FilePreview = ({ fileName }: FilePreviewProps) => {
  const { data: file } = useFileQuery(fileName);
  const fileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  }, [file]);
  switch (getFileType(fileName)) {
    case FileType.PDF:
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
    case FileType.IMAGE:
      return (
        <>
          <a className="w-full rounded-sm bg-admin-primary-main text-white" href={fileUrl} download>
            다운로드
          </a>
          <Image src={fileUrl} priority={false} layout="responsive" alt={fileName ?? ''} width={532} height={532} />
        </>
      );
    case FileType.EMPTY:
      return <div>첨부된 파일이 없습니다.</div>;
    default:
      return (
        <>
          <a className="w-full rounded-sm bg-admin-primary-main text-white" href={fileUrl} download>
            다운로드
          </a>
          <div>미리보기는 PDF, PNG, JPG, JPEG 파일만 제공됩니다.</div>
        </>
      );
  }
};

export default FilePreview;
