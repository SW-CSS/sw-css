/* eslint-disable react/jsx-wrap-multilines */

'use client';

import SubTitle from '@/components/SubTitle';
import { useAppSelector } from '@/lib/hooks/redux';
import { useStudentMemberQuery } from '@/lib/hooks/useApi';
import { appendDashPhoneNumber, convertCareer } from '@/lib/utils/utils';

import StudentInfoLabel from './StudentInfoLabel';

const StudentInfoSection = () => {
  // TODO - auth에 학번 정보 저장하도록 하기
  const auth = useAppSelector((state) => state.auth).value;
  const { data: member } = useStudentMemberQuery(202055558);
  return (
    <div className="w-[480px] rounded-sm bg-white p-5">
      <SubTitle title="내 정보" urlText="수정" url="/my-page/edit" />
      {member && (
        <div>
          <div className="my-5 flex items-end gap-4">
            <p className="text-xl font-bold">{member.name}</p>
            <p className="text-lg text-comment">{member.email}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between gap-4">
              {member.major && <StudentInfoLabel label="주전공" value={member.major} />}
              {member.minor && <StudentInfoLabel label="부전공" value={member.minor} />}
              {member.doubleMajor && <StudentInfoLabel label="복수전공" value={member.doubleMajor} />}
            </div>
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
      )}
    </div>
  );
};
export default StudentInfoSection;
