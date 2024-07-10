'use client';

import SubTitle from '@/components/SubTitle';
import { useAppSelector } from '@/lib/hooks/redux';
import { useStudentMemberQuery } from '@/lib/hooks/useApi';

const StudentInfoSection = () => {
  // TODO - auth에 학번 정보 저장하도록 하기
  const auth = useAppSelector((state) => state.auth).value;
  const { data: member } = useStudentMemberQuery(202055558);
  return (
    <div className="w-[530px] rounded-sm bg-white p-5">
      <SubTitle title="내 정보" urlText="수정" url="/my-page/edit" />
      {console.log(member)}
    </div>
  );
};
export default StudentInfoSection;
