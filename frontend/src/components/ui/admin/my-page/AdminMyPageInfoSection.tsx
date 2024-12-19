import { FacultyMemberDto } from '@/types/common.dto';
import { appendDashPhoneNumber } from '@/lib/utils/utils';

import { VscWarning } from '@react-icons/all-files/vsc/VscWarning';

export interface AdminMyPageInfoSectionProps {
  info: FacultyMemberDto;
}

export default function AdminMyPageInfoSection({ info }: AdminMyPageInfoSectionProps) {
  if (!info) {
    return (
      <div className="flex items-center justify-center gap-2 text-center text-admin-semantic-error-light">
        <VscWarning className="h-8 w-8" />
        <p>정보를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <div className="mb-5 flex flex-wrap items-end gap-4">
        <p className="text-xl font-bold">{info.name}</p>
        <p className="text-lg text-comment">{info.email}</p>
      </div>
      <div className="mb-4 flex w-full justify-between gap-4">
        <p className="flex sm:min-w-80 sm:flex-1">
          <span className="mr-4 w-[5em]">{'전화번호'}</span>
          <b>{appendDashPhoneNumber(info.phoneNumber)}</b>
        </p>
        <p className="flex sm:min-w-80 sm:flex-1">
          <span className="mr-4 w-[5em]">{'교직원번호'}</span>
          <b>{info.facultyId}</b>
        </p>
      </div>
    </div>
  );
}
