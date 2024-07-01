'use client';

import { useEffect, useMemo } from 'react';

import MilestoneDetail from '@/app/components/MilestoneDetail';
import MilestoneChart from '@/components/MilestoneChart';
import MilestoneTable from '@/components/MilestoneTable';
import { useMilestoneScoresOfStudent } from '@/lib/hooks/useApi';
import { MilestoneScoreDto, TotalMilestoneScores } from '@/types/common.dto';

import { Content, Title, SubTitle, MilestoneWrapper } from './styled';

const Page = () => {
  const { data: milestoneScoresOfStudent } = useMilestoneScoresOfStudent({
    memberId: 202055558,
    startDate: '2024-06-05',
    endDate: '2024-06-10',
  });

  const calculateTotalMilestoneScores = (milestoneScores: MilestoneScoreDto[]) => {
    const result: TotalMilestoneScores = {
      practicalScore: 0,
      globalScore: 0,
      communicationScore: 0,
      totalScore: 0,
    };
    milestoneScores?.forEach((milestoneScore) => {
      switch (milestoneScore.group) {
        case 'ACTIVITY':
          result.practicalScore += milestoneScore.score;
          break;
        case 'GLOBAL':
          result.globalScore += milestoneScore.score;
          break;
        case 'COMMUNITY':
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

  useEffect(() => {
    console.log(totalMilestoneScores);
  }, [totalMilestoneScores]);

  return (
    <Content>
      <Title>마일스톤 획득 내역</Title>
      <SubTitle>전체 현황</SubTitle>
      <div style={{ display: 'flex', gap: '16px' }}>
        <MilestoneWrapper>
          <MilestoneChart chartSize={180} fontSize="lg" totalMilestoneScores={totalMilestoneScores} />
          <MilestoneTable totalMilestoneScores={totalMilestoneScores} />
        </MilestoneWrapper>
        <MilestoneDetail />
      </div>
    </Content>
  );
};

export default Page;
