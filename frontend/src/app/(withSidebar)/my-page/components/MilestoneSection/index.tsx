/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */

'use client';

import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import SubTitle from '@/components/SubTitle';
import { MilestoneInfoType, initialMilestoneOverview, milestoneInfoTypes } from '@/data/milestone';
import { useAppSelector } from '@/lib/hooks/redux';
import { useMilestoneScoresOfStudentQuery } from '@/lib/hooks/useApi';
import { compareByIdAsc } from '@/lib/utils/utils';
import { Period } from '@/types/common';
import { MilestoneOverviewScore } from '@/types/milestone';

import MilestoneHistoryTable from '../../milestone/components/MilestoneHistoryTable';
import MilestoneRowBarTable from '../MilestoneRowBarTable';

const MilestoneSection = () => {
  const auth = useAppSelector((state) => state.auth).value;
  const searchFilterPeriod: Period = {
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  };
  const [selectedInfoType, setSelectedInfoType] = useState<MilestoneInfoType>(MilestoneInfoType.TOTAL);
  const { data: milestoneScores } = useMilestoneScoresOfStudentQuery(
    auth.uid,
    searchFilterPeriod.startDate,
    searchFilterPeriod.endDate,
  );
  const milestoneOverviewScore: MilestoneOverviewScore = useMemo(
    () =>
      milestoneScores?.reduce<MilestoneOverviewScore>(
        (acc, cur) => {
          const key = `${cur.group.toLowerCase()}Score` as keyof MilestoneOverviewScore;
          acc[key] += cur.score;
          acc.totalScore += cur.score;
          return acc;
        },
        { ...initialMilestoneOverview },
      ) || initialMilestoneOverview,
    [milestoneScores],
  );

  return (
    <div className="w-[630px] rounded-sm bg-white p-5">
      <SubTitle title="내 마일스톤 상세" urlText="전체보기" url="/my-page/milestone" />
      <div className="my-5 flex items-center justify-end gap-2">
        <span className="rounded-lg bg-border px-4 py-1">{searchFilterPeriod.startDate}</span>~
        <span className="rounded-lg bg-border px-4 py-1">{searchFilterPeriod.endDate}</span>
      </div>
      <div className="flex">
        {milestoneInfoTypes.map((type) => (
          <button
            type="button"
            className={`h-[30px] flex-grow border-0 bg-white ${selectedInfoType === type.id ? 'border-b-2 text-black' : 'text-comment'} border-black hover:border-b-2 hover:text-black`}
            key={type.id}
            onClick={() => setSelectedInfoType(type.id)}
          >
            {type.text}
          </button>
        ))}
      </div>
      <div className="p-4">
        {selectedInfoType === MilestoneInfoType.TOTAL && (
          <div className="flex py-10">
            <MilestoneChart chartSize={180} fontSize="lg" milestoneOverviewScore={milestoneOverviewScore} />
            <MilestoneTable milestoneOverviewScore={milestoneOverviewScore} />
          </div>
        )}
        {(selectedInfoType === MilestoneInfoType.ACTIVITY ||
          selectedInfoType === MilestoneInfoType.GLOBAL ||
          selectedInfoType === MilestoneInfoType.COMMUNITY) && (
          <MilestoneRowBarTable
            milestoneScores={
              milestoneScores
                ?.filter((milestoneScore) => milestoneScore.group === selectedInfoType)
                .sort(compareByIdAsc) ?? []
            }
          />
        )}
        {selectedInfoType === MilestoneInfoType.HISTORY && (
          <MilestoneHistoryTable searchFilterPeriod={searchFilterPeriod} page={0} size={5} />
        )}
      </div>
    </div>
  );
};
export default MilestoneSection;
