/* eslint-disable react/jsx-wrap-multilines */

'use client';

import SubTitle from '@/components/SubTitle';
import { useAppSelector } from '@/lib/hooks/redux';
import { useStudentMemberQuery } from '@/lib/hooks/useApi';
import { appendDashPhoneNumber, convertCareer } from '@/lib/utils/utils';
import { VscWarning } from '@react-icons/all-files/vsc/VscWarning';

import StudentInfoLabel from './StudentInfoLabel';

const StudentInfoSection = () => {
  // TODO - 관리자가 로그인한 경우에 대한 처린
  const auth = useAppSelector((state) => state.auth).value;
  const { data: member } = useStudentMemberQuery(auth.uid);
  return (
    <div className="relative flex-grow rounded-sm bg-white p-5">
      <SubTitle title="내 정보" urlText="수정" url="/my-page/edit" />
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
                    {convertCareer(member.career)}
                  </span>
                  <span>{member.careerDetail}</span>
                </>
              }
            />
          </div>
        </div>
      ) : (
        <div className="text-admin-semantic-error-light absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
          <VscWarning className="h-8 w-8" />
          <p>
            학생 정보를 불러오는 데<br />
            실패했습니다.
          </p>
        </div>
      )}
    </div>
  );
};
export default StudentInfoSection;
