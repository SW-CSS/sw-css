'use client';

import { useMemo } from 'react';

import MilestoneDetail from '@/app/components/MilestoneDetail';
import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { COLOR } from '@/constants';
import { MilestoneGroup } from '@/data/milestoneGroup';
import { useMilestoneHistoriesOfStudent, useMilestoneScoresOfStudent } from '@/lib/hooks/useApi';
import { MilestoneScoreDto, TotalMilestoneScores } from '@/types/common.dto';

import * as S from './styled';

const Page = () => {
  const { data: milestoneScoresOfStudent } = useMilestoneScoresOfStudent({
    memberId: 202055558,
    startDate: '2024-06-05',
    endDate: '2024-06-10',
  });
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudent({ memberId: 202055558 });

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
  const calculateTotalMilestoneScores = (milestoneScores: MilestoneScoreDto[]) => {
    const result: TotalMilestoneScores = {
      practicalScore: 0,
      globalScore: 0,
      communicationScore: 0,
      totalScore: 0,
    };

    milestoneScores?.forEach((milestoneScore) => {
      switch (milestoneScore.group) {
        case MilestoneGroup.ACTIVITY:
          result.practicalScore += milestoneScore.score;
          break;
        case MilestoneGroup.GLOBAL:
          result.globalScore += milestoneScore.score;
          break;
        case MilestoneGroup.COMMUNITY:
          result.communicationScore += milestoneScore.score;
          break;
        default:
          break;
      }
      result.totalScore += milestoneScore.score;
    });
    return result;
  };

  const totalMilestoneScores: TotalMilestoneScores | undefined = useMemo(
    () => calculateTotalMilestoneScores(milestoneScoresOfStudent!),
    [milestoneScoresOfStudent],
  );

  return (
    <S.Content>
      <S.Title>마일스톤 획득 내역</S.Title>
      <S.SubTitle>전체 현황</S.SubTitle>
      <div style={{ display: 'flex', gap: '16px' }}>
        <S.MilestoneWrapper>
          <MilestoneChart chartSize={180} fontSize="lg" totalMilestoneScores={totalMilestoneScores} />
          <MilestoneTable totalMilestoneScores={totalMilestoneScores} />
        </S.MilestoneWrapper>
        <MilestoneDetail />
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
          {milestoneHistoriesOfStudent?.map((milestoneHistory) => (
            <S.TableRow key={milestoneHistory.id}>
              <S.HistoryDescription>{milestoneHistory.description}</S.HistoryDescription>
              <td>
                <S.GroupLabel group={milestoneHistory.milestone.categoryGroup}>
                  {getLabelText(milestoneHistory.milestone.categoryGroup)}
                </S.GroupLabel>
              </td>
              <td>{milestoneHistory.milestone.score}</td>
              <td>{milestoneHistory.activatedAt.slice(0, 10)}</td>
            </S.TableRow>
          ))}
        </S.TableBody>
      </table>
    </S.Content>
  );
};

export default Page;
