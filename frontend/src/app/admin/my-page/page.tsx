import PageTitle from '@/components/common/PageTitle';
import AdminMyPageInfoForm from '@/components/ui/admin/my-page/AdminMyPageInfoForm';
import AdminMyPageInfoSection from '@/components/ui/admin/my-page/AdminMyPageInfoSection';
import AdminMyPagePasswordForm from '@/components/ui/admin/my-page/AdminMyPagePasswordForm';

import { FacultyMemberDto } from '@/types/common.dto';

export default function AdminMyPage() {
  const myInfo: FacultyMemberDto = tempMyInfo;

  return (
    <>
      <PageTitle title="내 정보" />
      <AdminMyPageInfoSection info={myInfo} />
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
