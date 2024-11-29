import Image from 'next/image';

import { HistoryFileType } from '@/data/milestone';
import { getFileType } from '@/lib/utils/utils';

interface FilePreviewProps {
  fileName: string | null;
}

const FilePreview = ({ fileName }: FilePreviewProps) => {
  switch (getFileType(fileName)) {
    case HistoryFileType.PDF:
      return (
        <>
          <a
            className="w-full rounded-sm bg-admin-primary-main text-white"
            href={process.env.NEXT_PUBLIC_FILE_URL + '/' + fileName}
            download
          >
            다운로드
          </a>
          <embed
            src={process.env.NEXT_PUBLIC_FILE_URL + '/' + fileName}
            type="application/pdf"
            className="h-full w-full"
            style={{ height: '100%', minHeight: '800px' }}
          />
        </>
      );
    case HistoryFileType.IMAGE:
      return (
        <>
          <a
            className="w-full rounded-sm bg-admin-primary-main text-white"
            href={process.env.NEXT_PUBLIC_FILE_URL + '/' + fileName}
            download
          >
            다운로드
          </a>
          <Image
            src={process.env.NEXT_PUBLIC_FILE_URL + '/' + fileName}
            priority={false}
            layout="responsive"
            alt={fileName ?? ''}
            width={532}
            height={532}
          />
        </>
      );
    case HistoryFileType.EMPTY:
      return <div>첨부된 파일이 없습니다.</div>;
    default:
      return <div>잘못된 유형의 파일이 첨부되어 있습니다.</div>;
  }
};

export default FilePreview;
