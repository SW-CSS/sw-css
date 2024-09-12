/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */

import SubTitle from '@/components/SubTitle';
import { getMilestoneHistoriesOfStudent } from '@/lib/api/server.api';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import MilestoneHistoryStatusLabel from '../MilestoneHistoryStatusLabel';

const MilestoneHistorySection = async () => {
  const auth = getAuthFromCookie();

  let milestoneHistoriesOfStudent;
  try {
    milestoneHistoriesOfStudent = await getMilestoneHistoriesOfStudent(
      auth.token,
      auth.id,
      undefined,
      undefined,
      undefined,
      MilestoneHistorySortCriteria.ACTIVATED_AT,
      SortDirection.DESC,
      0,
      5,
    );
  } catch (err) {
    // TODO: server api error handling...
  }

  return (
    <div className="relative w-full min-w-[260px] flex-1 rounded-sm bg-white p-5 lg:max-w-[280px]">
      <SubTitle title="실적 등록" urlText="등록하기" url="/my-page/milestone/register" />
      <div className="mt-4">
        {milestoneHistoriesOfStudent ? (
          milestoneHistoriesOfStudent.content.map((milestoneHistory) => (
            <div key={milestoneHistory.id} className="flex flex-col gap-[2px] border-b border-border py-2">
              <p>{milestoneHistory.description}</p>
              <p className="flex items-end justify-between">
                <span className="text-xs text-comment">활동일: {milestoneHistory.activatedAt}</span>
                <MilestoneHistoryStatusLabel
                  status={milestoneHistory.status}
                  rejectReason={milestoneHistory.rejectReason}
                />
              </p>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-comment">등록한 실적이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default MilestoneHistorySection;
