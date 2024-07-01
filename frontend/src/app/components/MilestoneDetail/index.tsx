'use client';

import { useEffect, useState } from 'react';

import { MilestoneGroup, milestoneGroups } from '@/data/milestoneGroup';
import { useMilestoneScoresOfStudent } from '@/lib/hooks/useApi';
import { MilestoneScoreDto } from '@/types/common.dto';

import { GroupButton, TableRow, TableRowBar, TableRowScore, TableRowTitle, TableRowBarFill } from './styled';

const compareByIdAsc = (a: MilestoneScoreDto, b: MilestoneScoreDto) => {
  if (a.id > b.id) return 1;
  return -1;
};

const MilestoneDetail = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>(MilestoneGroup.ACTIVITY);
  const { data: milestoneScores } = useMilestoneScoresOfStudent({
    memberId: 202055558,
    startDate: '2024-06-05',
    endDate: '2024-06-10',
  });
  useEffect(() => {}, []);

  return (
    <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        {milestoneGroups.map((group) => (
          <GroupButton
            key={group.id}
            isSelected={selectedGroup === group.id}
            onClick={() => setSelectedGroup(group.id)}
          >
            {group.text}
          </GroupButton>
        ))}
      </div>
      <div style={{ padding: '20px' }}>
        {milestoneScores
          ?.filter((milestoneScore) => milestoneScore.group === selectedGroup)
          .sort(compareByIdAsc)
          .map((milestoneScore) => (
            <TableRow key={milestoneScore.id}>
              <TableRowTitle>{milestoneScore.name}</TableRowTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TableRowBar>
                  <TableRowBarFill ratio={milestoneScore.score / milestoneScore.limitScore} />
                </TableRowBar>
                <TableRowScore>
                  {milestoneScore.score}/{milestoneScore.limitScore}
                </TableRowScore>
              </div>
            </TableRow>
          ))}
      </div>
    </div>
  );
};

export default MilestoneDetail;
