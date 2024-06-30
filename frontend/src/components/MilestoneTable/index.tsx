import { COLOR } from '@/constants';

import * as S from './styled';

interface MilestoneTableProps {
  practicalScore: number;
  globalScore: number;
  communicationScore: number;
  totalScore: number;
}

const MilestoneTable = ({ practicalScore, globalScore, communicationScore, totalScore }: MilestoneTableProps) => {
  const squareSize = 12;
  const scores = [
    { score: practicalScore, color: COLOR.milestone.blue, title: '실전적 SW역량' },
    { score: globalScore, color: COLOR.milestone.green, title: '글로벌 SW역량' },
    { score: communicationScore, color: COLOR.milestone.purple, title: '커뮤니티 SW역량' },
  ];

  return (
    <S.TableWrapper style={{ alignContent: 'center' }}>
      <S.TableTitle>역량 구분</S.TableTitle> <S.TableTitle>획득</S.TableTitle>
      {scores.map((bar) => (
        <>
          <S.ScoreContent key={`1-${bar.color}`}>
            <S.Square size={squareSize} color={bar.color} />
            {bar.title}
          </S.ScoreContent>
          <S.TableBottomBorderContent key={`2-${bar.color}`}>{bar.score}</S.TableBottomBorderContent>
        </>
      ))}
      <S.TableTopBorderContent>합계</S.TableTopBorderContent>
      <S.TableTopBorderContent>{totalScore}</S.TableTopBorderContent>
    </S.TableWrapper>
  );
};

export default MilestoneTable;
