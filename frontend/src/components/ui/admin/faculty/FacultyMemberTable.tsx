'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/lib/hooks/redux';
import { useDeleteFacultyMutation } from '@/lib/hooks/useAdminApi';
import { FacultyMemberDto } from '@/types/common.dto';

export default function FacultyMemberTable({ members }: { members: FacultyMemberDto[] }) {
  const { mutate: deleteFaculty } = useDeleteFacultyMutation();
  const auth = useAppSelector((state) => state.auth).value;
  const router = useRouter();

  const handleDeleteButtonClick = (member: FacultyMemberDto) => {
    window.confirm(`${member.name}을(를) 삭제하시겠습니까?`);
    deleteFaculty(member.facultyId, {
      onSuccess() {
        toast.info('교직원 삭제에 성공했습니다.');
        router.refresh();
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
      <thead className="border-y-2 border-admin-border [&_th]:p-2">
        <tr>
          <th className="w-[100px]">이메일</th>
          <th className="w-[40px]">이름</th>
          <th className="w-[60px]">교직원 번호</th>
          <th className="w-[60px]">전화번호</th>
          {auth.id === 1 && <th className="w-[60px]">설정</th>}
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id} className="h-[50px] border-b-[1px] border-admin-border [&_td]:break-keep">
            <td className="p-2 pl-10 text-left">{member.email}</td>
            <td className="p-2 font-semibold">{member.name}</td>
            <td className="p-2">{member.facultyId}</td>
            <td className="p-2">{member.phoneNumber}</td>
            {auth.id === 1 && (
              <td>
                {auth.id !== member.facultyId && (
                  <button
                    type="button"
                    onClick={() => handleDeleteButtonClick(member)}
                    className="relative mx-auto flex w-fit gap-1 rounded-sm border-[1px] border-red-500 bg-red-100 px-2 py-1 text-red-500"
                  >
                    삭제
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
