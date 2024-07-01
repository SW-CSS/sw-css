/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { DateTime } from 'luxon';
import { ChangeEvent, useMemo, useState } from 'react';

import MilestoneDetail from '@/app/components/MilestoneDetail';
import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { COLOR } from '@/constants';
import { MilestoneGroup } from '@/data/milestoneGroup';
import { useMilestoneHistoriesOfStudent, useMilestoneScoresOfStudent } from '@/lib/hooks/useApi';
import { MilestoneHistoryOfStudentResponseDto, TotalMilestoneScores } from '@/types/common.dto';
import { FilterPeriod } from '@/types/milestone';

import * as S from './styled';

const compareByActivateDateAsc = (a: MilestoneHistoryOfStudentResponseDto, b: MilestoneHistoryOfStudentResponseDto) => {
  if (a.activatedAt > b.activatedAt) return 1;
  return -1;
};

const initialData: TotalMilestoneScores = {
  activityScore: 0,
  globalScore: 0,
  communityScore: 0,
  totalScore: 0,
};

const Page = () => {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<FilterPeriod>(filterPeriod);

  const { data: milestoneScoresOfStudent } = useMilestoneScoresOfStudent({
    memberId: 202055558,
    startDate: searchFilterPeriod.startDate,
    endDate: searchFilterPeriod.endDate,
  });
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudent({
    memberId: 202055558,
    startDate: searchFilterPeriod.startDate,
    endDate: searchFilterPeriod.endDate,
  });

  const handleSearch = () => {
    setSearchFilterPeriod(filterPeriod);
  };

  const getLabelText = (group: string) => {
    switch (group) {
      case MilestoneGroup.ACTIVITY:
        return '실전적';
      case MilestoneGroup.GLOBAL:
        return '글로벌';
      case MilestoneGroup.COMMUNITY:
        return '커뮤니티';
      default:
        return '기타';
    }
  };

  const totalMilestoneScores: TotalMilestoneScores = useMemo(
    () =>
      milestoneScoresOfStudent?.reduce<TotalMilestoneScores>(
        (acc, cur) => {
          const key = `${cur.group.toLowerCase()}Score` as keyof TotalMilestoneScores;
          acc[key] += cur.score;
          acc.totalScore += cur.score;
          return acc;
        },
        { ...initialData },
      ) || initialData,
    [milestoneScoresOfStudent],
  );

  return (
    <S.Content>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <S.Title>마일스톤 획득 내역</S.Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <S.PeriodInput
            type="date"
            value={filterPeriod.startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterPeriod({ ...filterPeriod, startDate: e.target.value })
            }
          />
          ~
          <S.PeriodInput
            type="date"
            value={filterPeriod.endDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterPeriod({ ...filterPeriod, endDate: e.target.value })
            }
          />
          <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
        </div>
      </div>
      <S.SubTitle>전체 현황</S.SubTitle>
      <div style={{ display: 'flex', gap: '16px' }}>
        <S.MilestoneWrapper>
          <MilestoneChart chartSize={180} fontSize="lg" totalMilestoneScores={totalMilestoneScores} />
          <MilestoneTable totalMilestoneScores={totalMilestoneScores} />
        </S.MilestoneWrapper>
        <MilestoneDetail startDate={searchFilterPeriod.startDate} endDate={searchFilterPeriod.endDate} />
      </div>
      <div style={{ borderBottom: `1px dotted ${COLOR.border}`, margin: '30px 0px' }} />
      <S.SubTitle>획득 내역</S.SubTitle>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <S.TableRow>
            <th>활동명</th>
            <th>역량 구분</th>
            <th>획득 점수</th>
            <th>활동일</th>
          </S.TableRow>
        </thead>
        <S.TableBody>
          {milestoneHistoriesOfStudent?.sort(compareByActivateDateAsc).map((milestoneHistory) => (
            <S.TableRow key={milestoneHistory.id}>
              <S.HistoryDescription>{milestoneHistory.description}</S.HistoryDescription>
              <td>
                <S.GroupLabel group={milestoneHistory.milestone.categoryGroup}>
                  {getLabelText(milestoneHistory.milestone.categoryGroup)}
                </S.GroupLabel>
              </td>
              <td>{milestoneHistory.milestone.score * milestoneHistory.count}</td>
              <td>{milestoneHistory.activatedAt.slice(0, 10)}</td>
            </S.TableRow>
          ))}
        </S.TableBody>
      </table>
    </S.Content>
  );
};

export default Page;
