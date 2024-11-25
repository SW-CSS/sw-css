import { MilestoneOverviewScore } from '@/types/milestone';

export interface MilestoneOverviewTableProps {
  milestoneOverviewScore: MilestoneOverviewScore;
}

export default function MilestoneOverviewTable({ milestoneOverviewScore }: MilestoneOverviewTableProps) {
  const { activityScore, globalScore, communityScore, totalScore } = milestoneOverviewScore;

  const scores = [
    { score: activityScore, color: '#8FA3F8', title: '실전적 SW역량' },
    { score: globalScore, color: '#9DE6BC', title: '글로벌 SW역량' },
    { score: communityScore, color: '#AA8CF8', title: '커뮤니티 SW역량' },
  ];

  return (
    <table className="max-w-[300px] flex-grow text-center text-comment">
      <thead>
        <tr>
          <th className="w-[70%] border-b border-border p-[8px_4px] text-xs font-semibold text-black">역량 구분</th>
          <th className="w-[30%] border-b border-border p-[8px_4px] text-xs font-semibold text-black">획득</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <tr className="h-0 border-b border-border text-sm font-normal" key={`${score.title}-${score.color}`}>
            <td className="p-[8px_4px] pl-[14px] text-left align-middle leading-4">
              <div className="mr-1 inline-block h-3 w-3" style={{ backgroundColor: score.color }} />
              {score.title}
            </td>
            <td className="p-[8px_4px]">{score.score}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="text-sm font-normal">
          <td className="border-t border-black p-[8px_4px]">합계</td>
          <td className="border-t border-black p-[8px_4px]">{totalScore}</td>
        </tr>
      </tfoot>
    </table>
  );
}
