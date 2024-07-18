/* eslint-disable max-len */
import { VscInfo } from 'react-icons/vsc';

import { MilestoneHistoryStatus } from '@/data/milestone';

interface MilestoneHistoryStatusLabelProps {
  status: string;
  rejectReason: string | null;
}

const MilestoneHistoryStatusLabel = ({ status, rejectReason }: MilestoneHistoryStatusLabelProps) => {
  switch (status) {
    case MilestoneHistoryStatus.APPROVED:
      return <span className="rounded-sm bg-green-100 px-2 py-1 text-xs text-green-500">승인</span>;
    case MilestoneHistoryStatus.REJECTED:
      return (
        <div className="relative flex w-fit items-center gap-1 rounded-sm bg-red-100 px-2 py-1 text-xs text-red-500">
          <span>반려</span>
          <VscInfo className="peer h-[14px] w-[14px]" />
          <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-[calc(100%+4px)] rounded border bg-white p-2 peer-hover:block">
            {rejectReason}
          </div>
        </div>
      );
    case MilestoneHistoryStatus.PENDING:
      return <span className="rounded-sm bg-gray-100 px-2 py-1 text-xs text-gray-500">처리중</span>;
    default:
      return '잘못된 상태';
  }
};

export default MilestoneHistoryStatusLabel;
