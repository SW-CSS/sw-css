'use client';

import { useState } from 'react';

import { MilestoneGroup, milestoneGroups } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { compareByIdAsc } from '@/lib/utils/utils';
import { Period } from '@/types/common';

import { GroupButton } from './styled';
import MilestoneDetailTable from '@/components/ui/milestone/MilestoneDetailTable';

const MilestoneDetail = ({ startDate, endDate }: Period) => {
  const auth = useAppSelector((state) => state.auth).value;
  const [selectedGroup, setSelectedGroup] = useState<string>(MilestoneGroup.ACTIVITY);
  const { data: milestoneScores } = useMilestoneScoresOfStudentQuery(auth.id, startDate, endDate);

  return (
    <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>
      <div className="flex flex-wrap">
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
      <MilestoneDetailTable
        milestoneScores={
          milestoneScores?.filter((milestoneScore) => milestoneScore.group === selectedGroup).sort(compareByIdAsc) || []
        }
      />
    </div>
  );
};

export default MilestoneDetail;
