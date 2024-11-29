import { MilestoneScoreDto } from '@/types/common.dto';

interface MilestoneDetailTableProps {
  milestoneScores: MilestoneScoreDto[];
}

export default function MilestoneDetailTable({ milestoneScores }: MilestoneDetailTableProps) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {milestoneScores.map((milestoneScore) => (
          <tr key={milestoneScore.id} className="h-8 border-b border-border">
            <td className="relative before:invisible before:content-['&nbsp;']">
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                {milestoneScore.name}
              </span>
            </td>
            <td className="w-[75px]">
              <div className="h-[10px] w-full overflow-hidden rounded-lg bg-background-light">
                <div
                  className="h-full bg-primary-main"
                  style={{ width: `${(100 * milestoneScore.score) / milestoneScore.limitScore}%` }}
                />
              </div>
            </td>
            <td className="w-10 min-w-[55px] pl-2 text-xs">
              {milestoneScore.score}/{milestoneScore.limitScore}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
