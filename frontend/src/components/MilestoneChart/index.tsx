import { COLOR } from '@/constants';
import { milestoneSummaryInfo } from '@/mocks/milestone';
import { AuthSliceState } from '@/store/auth.slice';
import { getAuthFromCookie } from '@/utils';

import * as S from './styled';

const MilestoneChart = () => {
  const chartSize = 120;

  const auth: AuthSliceState = getAuthFromCookie();
  // TODO: getServerSideProps로 api 연결 - 마일스톤 통계 정보 가져오기.

  const scores = [
    {
      start: 0,
      score: milestoneSummaryInfo.practicalScore,
      color: COLOR.milestone.blue,
      title: '실전적 SW역량',
    },
    {
      start: milestoneSummaryInfo.practicalScore,
      score: milestoneSummaryInfo.globalScore,
      color: COLOR.milestone.green,
      title: '글로벌 SW역량',
    },
    {
      start: milestoneSummaryInfo.practicalScore + milestoneSummaryInfo.globalScore,
      score: milestoneSummaryInfo.communicationScore,
      color: COLOR.milestone.purple,
      title: '커뮤니티 SW역량',
    },
  ];

  return (
    <S.ChartWrapper>
      <S.Chart size={chartSize}>
        {scores.map((bar) => (
          <S.ChartBar key={bar.color} start={bar.start} score={bar.score} color={bar.color} />
        ))}
        <S.ChartHole size={chartSize} />
        <S.ChartTextWrapper>
          <S.ChartScoreText>50</S.ChartScoreText>
          <S.ChartText>/ 1000</S.ChartText>
        </S.ChartTextWrapper>
      </S.Chart>
      <S.TableWrapper style={{ alignContent: 'center' }}>
        <S.TableTitle>역량 구분</S.TableTitle> <S.TableTitle>획득</S.TableTitle>
        {scores.map((bar) => (
          <>
            <S.ScoreContent key={`1-${bar.color}`}>
              <S.Square size={12} color={bar.color} />
              {bar.title}
            </S.ScoreContent>
            <S.TableBottomBorderContent key={`2-${bar.color}`}>{bar.score}</S.TableBottomBorderContent>
          </>
        ))}
        <S.TableTopBorderContent>합계</S.TableTopBorderContent>
        <S.TableTopBorderContent>{milestoneSummaryInfo.totalScore}</S.TableTopBorderContent>
      </S.TableWrapper>
    </S.ChartWrapper>
  );
};

export default MilestoneChart;
