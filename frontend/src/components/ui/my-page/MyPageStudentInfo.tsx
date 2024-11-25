'use client';

import { ReactNode } from 'react';

import PageSubTitle from '@/components/common/PageSubTitle';
import { useAppSelector } from '@/lib/hooks/redux';
import { useStudentMemberQuery } from '@/lib/hooks/useApi';
import { appendDashPhoneNumber, convertCareerToStr } from '@/lib/utils/utils';
import { VscWarning } from '@react-icons/all-files/vsc/VscWarning';

export default function MyPageStudentInfo() {
  const auth = useAppSelector((state) => state.auth).value;
  let member;
  try {
    member = useStudentMemberQuery(auth.id).data;
  } catch (err) {
    // TODO: server api error handling
  }

  return (
    <div className="relative flex-grow rounded-sm bg-white p-5">
      <PageSubTitle title="내 정보" urlText="수정" url="/my-page/edit" />
      {member ? (
        <div className="my-5">
          <div className="mb-5 flex flex-wrap items-end gap-4">
            <p className="text-xl font-bold">{member.name}</p>
            <p className="text-lg text-comment">{member.email}</p>
          </div>
          <div className="mb-4 flex w-full justify-between gap-4">
            <StudentInfoLabel label="주전공" value={member.major} />
            {member.minor && <StudentInfoLabel label="부전공" value={member.minor} />}
            {member.doubleMajor && <StudentInfoLabel label="복수전공" value={member.doubleMajor} />}
          </div>
          <div className="flex flex-wrap gap-y-4">
            <StudentInfoLabel label="전화번호" value={appendDashPhoneNumber(member.phoneNumber)} />
            <StudentInfoLabel
              label="진로 계획"
              value={
                <>
                  <span className="mr-4 rounded border px-2 py-1 font-medium text-primary-main">
                    {convertCareerToStr(member.career)}
                  </span>
                  <span>{member.careerDetail}</span>
                </>
              }
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-admin-semantic-error-light">
          <VscWarning className="h-8 w-8" />
          <p>
            학생 정보를 불러오는 데<br />
            실패했습니다.
          </p>
        </div>
      )}
    </div>
  );
}

export interface StudentInfoLabelProps {
  label: string;
  value: ReactNode | string;
}

export function StudentInfoLabel({ label, value }: StudentInfoLabelProps) {
  return (
    <p className="flex sm:min-w-80 sm:flex-1">
      <span className="mr-4 w-[4em]">{label}</span>
      <b>{value}</b>
    </p>
  );
}
