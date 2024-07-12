'use client';

import { useState } from 'react';

import { MilestoneGroup, milestoneGroups } from '@/data/milestone';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { compareByIdAsc } from '@/lib/utils/utils';
import { Period } from '@/types/common';

import { GroupButton } from './styled';
import MilestoneRowBarTable from '../../../components/MilestoneRowBarTable';
import { useAppSelector } from '@/lib/hooks/redux';

const MilestoneDetail = ({ startDate, endDate }: Period) => {
  const auth = useAppSelector((state) => state.auth).value;
  const [selectedGroup, setSelectedGroup] = useState<string>(MilestoneGroup.ACTIVITY);
  const { data: milestoneScores } = useMilestoneScoresOfStudentQuery(auth.uid, startDate, endDate);

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
      <MilestoneRowBarTable
        milestoneScores={milestoneScores
          ?.filter((milestoneScore) => milestoneScore.group === selectedGroup)
          .sort(compareByIdAsc)}
      />
    </div>
  );
};

export default MilestoneDetail;
