import { MilestoneHistoryDto } from '@/types/common.dto';

interface MilestoneHistoryTableProps {
  histories: MilestoneHistoryDto[];
}

const MilestoneHistoryTable = ({ histories }: MilestoneHistoryTableProps) => (
  <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
    <thead className="border-y-2 border-admin-border [&_th]:p-2">
      <th className="w-[60px]">No.</th>
      <th className="w-[60px]">이름</th>
      <th className="w-[80px]">학번</th>
      <th className="w-[100px]">활동 코드</th>
      <th className="w-[100px]">활동명</th>
      <th className="w-[80px]">건당 점수</th>
      <th className="w-[80px]">활동 횟수(건)</th>
      <th className="w-[100px]">활동일</th>
      <th className="w-[100px]">등록일</th>
      <th className="w-[80px]">파일</th>
      <th className="w-[100px]">승인 여부</th>
    </thead>
    <tbody>
      {histories.map((history) => {
        const { milestone } = history;
        return (
          <tr key={history.id} className="h-[50px] border-b-[1px] border-admin-border [&_td]:break-keep [&_td]:p-2">
            <td> {history.id} </td>
            <td className="font-semibold">{history.student.name}</td>
            <td className="font-semibold">{history.student.id}</td>
            <td>{milestone.id}</td>
            <td>{history.description}</td>
            <td>{milestone.score}</td>
            <td>{history.count}</td>
            <td>{history.activatedAt}</td>
            <td>{history.createdAt.slice(0, 10)}</td>
            <td>{history.fileUrl}</td>
            <td>
              <button type="button">{history.status}</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default MilestoneHistoryTable;
