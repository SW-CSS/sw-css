import { MemberDto } from '@/types/common.dto';

const MemberTable = ({ members }: { members: MemberDto[] }) => (
  <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
    <thead className="border-y-2 border-admin-border [&_th]:p-2">
      <th className="w-[100px]">이메일</th>
      <th className="w-[60px]">이름</th>
      <th className="w-[80px]">학번</th>
      <th className="w-[100px]">주전공</th>
      <th className="w-[100px]">부전공</th>
      <th className="w-[100px]">복수전공</th>
      <th className="w-[80px]">전화번호</th>
      <th className="w-[100px]">진로</th>
    </thead>
    <tbody>
      {members.map((member) => {
        const emailWords = member.email.split('@');
        return (
          <tr key={member.id} className="h-[50px] border-b-[1px] border-admin-border [&_td]:break-keep [&_td]:p-2">
            <td>
              {emailWords[0]} <br />
              <span className="text-xs text-admin-comment">@pusan.ac.kr</span>
            </td>
            <td className="font-semibold">{member.name}</td>
            <td>{member.id}</td>
            <td>{member.major}</td>
            <td>{member.minor}</td>
            <td>{member.doubleMajor}</td>
            <td>{member.phoneNumber}</td>
            <td className="overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal">{member.career}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default MemberTable;
