import { MilestoneGroup } from '@/data/milestoneGroup';
import { useMilestoneHistoriesOfStudent } from '@/lib/hooks/useApi';
import { Period } from '@/types/common';
import { MilestoneHistoryOfStudentResponseDto } from '@/types/common.dto';

import * as S from './styled';

const compareByActivateDateAsc = (a: MilestoneHistoryOfStudentResponseDto, b: MilestoneHistoryOfStudentResponseDto) => {
  if (a.activatedAt > b.activatedAt) return 1;
  return -1;
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

interface MilestoneHistoryTableProps {
  searchFilterPeriod: Period;
}

const MilestoneHistoryTable = ({ searchFilterPeriod }: MilestoneHistoryTableProps) => {
  const { data: milestoneHistoriesOfStudent } = useMilestoneHistoriesOfStudent({
    memberId: 202055558,
    startDate: searchFilterPeriod.startDate,
    endDate: searchFilterPeriod.endDate,
  });
  return (
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
  );
};

export default MilestoneHistoryTable;
