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
    <div className="grid max-w-[300px] flex-grow grid-cols-[70%_30%] content-center text-center text-comment">
      <div className="border-b border-border p-[8px_4px] text-xs font-semibold text-black">역량 구분</div>
      <div className="border-b border-border p-[8px_4px] text-xs font-semibold text-black">획득</div>
      {scores.map((bar) => (
        <>
          <div
            className="flex items-center gap-1 border-b border-border p-[8px_4px] pl-[14px] text-sm font-normal"
            key={`${bar.title}-${bar.color}`}
          >
            <div className="h-3 w-3" style={{ backgroundColor: bar.color }} />
            {bar.title}
          </div>
          <div className="border-t border-border p-[8px_4px] text-sm font-normal" key={`2-${bar.color}`}>
            {bar.score}
          </div>
        </>
      ))}
      <div className="border-t border-black p-[8px_4px] text-sm font-normal">합계</div>
      <div className="border-t border-black p-[8px_4px] text-sm font-normal">{totalScore}</div>
    </div>
  );
}
