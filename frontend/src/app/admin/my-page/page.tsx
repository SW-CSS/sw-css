import PageTitle from '@/components/common/PageTitle';
import AdminMyPageInfoForm from '@/components/ui/admin/my-page/AdminMyPageInfoForm';
import AdminMyPagePasswordForm from '@/components/ui/admin/my-page/AdminMyPagePasswordForm';
import { appendDashPhoneNumber } from '@/lib/utils/utils';
import { FacultyMemberDto } from '@/types/common.dto';
import { VscWarning } from '@react-icons/all-files/vsc/VscWarning';

export default function AdminMyPage() {
  const myInfo: FacultyMemberDto = tempMyInfo;

  return (
    <>
      <PageTitle title="내 정보" />
      {myInfo ? (
        <div className="m-5">
          <div className="mb-5 flex flex-wrap items-end gap-4">
            <p className="text-xl font-bold">{myInfo.name}</p>
            <p className="text-lg text-comment">{myInfo.email}</p>
          </div>
          <div className="mb-4 flex w-full justify-between gap-4">
            <p className="flex sm:min-w-80 sm:flex-1">
              <span className="mr-4 w-[5em]">{'전화번호'}</span>
              <b>{appendDashPhoneNumber(myInfo.phoneNumber)}</b>
            </p>
            <p className="flex sm:min-w-80 sm:flex-1">
              <span className="mr-4 w-[5em]">{'교직원번호'}</span>
              <b>{myInfo.facultyId}</b>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 text-center text-admin-semantic-error-light">
          <VscWarning className="h-8 w-8" />
          <p>정보를 불러오는 데 실패했습니다.</p>
        </div>
      )}
      <hr className="my-8" />
      <PageTitle title="내 정보 수정" />
      <div className="m-5 grid grid-cols-[8fr_8px_8fr] gap-4">
        <AdminMyPagePasswordForm />
        <div className="w-1 border-2 border-border" />
        <AdminMyPageInfoForm info={myInfo} />
      </div>
    </>
  );
}

const tempMyInfo: FacultyMemberDto = {
  id: 1,
  facultyId: 123412,
  name: '김주승',
  email: 'admin@pusan.ac.kr',
  phoneNumber: '01012341234',
};
