import { COLOR } from '@/constants';
import { MilestoneSummaryDto } from '@/types/common.dto';

import * as S from './styled';

const MilestoneChart = ({ practicalScore, globalScore, communicationScore, totalScore }: MilestoneSummaryDto) => {
  const chartSize = 120;

  const scores = [
    { start: 0, score: practicalScore, color: COLOR.milestone.blue, title: '실전적 SW역량' },
    { start: practicalScore, score: globalScore, color: COLOR.milestone.green, title: '글로벌 SW역량' },
    {
      start: practicalScore + globalScore,
      score: communicationScore,
      color: COLOR.milestone.purple,
      title: '커뮤니티 SW역량',
    },
  ];

  return (
    <S.Chart size={chartSize}>
      {scores.map((bar) => (
        <S.ChartBar key={bar.color} start={bar.start} score={bar.score} color={bar.color} />
      ))}
      <S.ChartHole size={chartSize} />
      <S.ChartTextWrapper>
        <S.ChartScoreText>{totalScore}</S.ChartScoreText>
        <S.ChartText>/ 1000</S.ChartText>
      </S.ChartTextWrapper>
    </S.Chart>
  );
};

export default MilestoneChart;
