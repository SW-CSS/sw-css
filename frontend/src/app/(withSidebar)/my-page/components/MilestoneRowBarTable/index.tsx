/* eslint-disable implicit-arrow-linebreak */

import { MilestoneScoreDto } from '@/types/common.dto';

interface MilestoneRowBarTableProps {
  milestoneScores: MilestoneScoreDto[] | undefined;
}

const MilestoneRowBarTable = ({ milestoneScores }: MilestoneRowBarTableProps) =>
  milestoneScores?.map((milestoneScore) => (
    <div
      key={milestoneScore.id}
      className="itams-center flex justify-between gap-2 border-b border-border py-2 text-sm"
    >
      <div className="shrink">{milestoneScore.name}</div>
      <div className="flex items-center gap-2">
        <div className="h-[10px] w-[75px] overflow-hidden rounded-lg bg-background-light">
          <div
            className="h-full bg-primary-main"
            style={{ width: `${(100 * milestoneScore.score) / milestoneScore.limitScore}%` }}
          />
        </div>
        <div className="min-w-[45px] text-xs">
          {milestoneScore.score}/{milestoneScore.limitScore}
        </div>
      </div>
    </div>
  ));

export default MilestoneRowBarTable;
