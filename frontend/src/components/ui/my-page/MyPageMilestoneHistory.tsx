import PageSubTitle from '@/components/common/PageSubTitle';
import { getMilestoneHistoriesOfStudent } from '@/lib/api/server.api';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { MilestoneHistorySortCriteria, SortDirection } from '@/types/milestone';

import MilestoneStatusLabel from '@/components/ui/milestone/MilestoneStatusLabel';

export default async function MyPageMilestoneHistory() {
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
      6,
    );
  } catch (err) {
    // TODO: server api error handling...
  }

  return (
    <div className="relative w-full min-w-[260px] flex-1 rounded-sm bg-white p-5 lg:max-w-[280px]">
      <PageSubTitle title="실적 관리" urlText="전체보기" url="/my-page/milestone-list" />
      <div className="mt-4">
        {milestoneHistoriesOfStudent ? (
          milestoneHistoriesOfStudent.content.map((milestoneHistory) => (
            <div key={milestoneHistory.id} className="flex flex-col gap-[2px] border-b border-border py-2">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap pr-2">{milestoneHistory.description}</p>
              <p className="flex items-end justify-between">
                <span className="text-xs text-comment">활동일: {milestoneHistory.activatedAt}</span>
                <MilestoneStatusLabel status={milestoneHistory.status} rejectReason={milestoneHistory.rejectReason} />
              </p>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-comment">등록한 실적이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
