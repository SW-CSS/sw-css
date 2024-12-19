'use client';
import PageTitle from '@/components/common/PageTitle';
import MyPageInfoForm from '@/components/ui/my-page/MyPageInfoForm';
import MyPagePasswordForm from '@/components/ui/my-page/MyPagePasswordForm';
import { useStudentMemberQuery } from '@/lib/hooks/useApi';

export default function EditMyInfoPage() {
  const myInfo = useStudentMemberQuery().data;

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <PageTitle title="내 정보 수정" />

      <MyPagePasswordForm />
      <hr className="border-2 border-border" />
      {myInfo && <MyPageInfoForm info={myInfo} />}
    </div>
  );
}
