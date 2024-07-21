/* eslint-disable max-len */

'use client';

import { MemberDto } from '@/types/common.dto';

const MemberTable = ({ members }: { members: MemberDto[] }) => {
  const handleDeleteButtonClick = (member: MemberDto) => {
    window.confirm(`${member.name}을(를) 삭제하시겠습니까?`);
  };
  return (
    <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
      <thead className="border-y-2 border-admin-border [&_th]:p-2">
        <th className="w-[100px]">이메일</th>
        <th className="w-[40px]">이름</th>
        <th className="w-[60px]">교직원 번호</th>
        <th className="w-[60px]">전화번호</th>
        <th className="w-[60px]">설정</th>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id} className="h-[50px] border-b-[1px] border-admin-border [&_td]:break-keep">
            <td className="p-2 pl-10 text-left">{member.email}</td>
            <td className="p-2 font-semibold">{member.name}</td>
            <td className="p-2">{member.id}</td>
            <td className="p-2">{member.phoneNumber}</td>
            <td>
              <button
                type="button"
                onClick={() => handleDeleteButtonClick(member)}
                className="relative mx-auto flex w-fit gap-1 rounded-sm border-[1px] border-red-500 bg-red-100 px-2 py-1 text-red-500"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberTable;
