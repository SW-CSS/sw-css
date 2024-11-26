'use client';

import { useState } from 'react';

import { MilestoneGroup, milestoneGroups } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { compareByIdAsc } from '@/lib/utils/utils';
import { Period } from '@/types/common';

import MilestoneDetailTable from '@/components/ui/milestone/MilestoneDetailTable';

export default function MyPageMilestoneDetail({ startDate, endDate }: Period) {
  const auth = useAppSelector((state) => state.auth).value;
  const [selectedGroup, setSelectedGroup] = useState<string>(MilestoneGroup.ACTIVITY);
  const { data: milestoneScores } = useMilestoneScoresOfStudentQuery(auth.id, startDate, endDate);

  return (
    <div className="flex grow flex-col">
      <div className="flex flex-wrap">
        {milestoneGroups.map((group) => (
          <button
            key={group.id}
            className={`h-[30px] grow border-0 border-black bg-white hover:border-b-2 hover:text-black ${selectedGroup === group.id ? 'border-b-2 text-black' : 'text-comment'}`}
            onClick={() => setSelectedGroup(group.id)}
          >
            {group.text}
          </button>
        ))}
      </div>
      <MilestoneDetailTable
        milestoneScores={
          milestoneScores?.filter((milestoneScore) => milestoneScore.group === selectedGroup).sort(compareByIdAsc) || []
        }
      />
    </div>
  );
}
