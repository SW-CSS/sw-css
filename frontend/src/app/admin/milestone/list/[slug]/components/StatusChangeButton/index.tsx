'use client';

import {
  useMilestoneHistoryStatusApproveMutation,
  useMilestoneHistoryStatusCancelMutation,
  useMilestoneHistoryStatusRejectMutation,
} from '@/lib/hooks/useAdminApi';

const StatusChangeButton = () => {
  const { mutate: approveMilestoneHistory } = useMilestoneHistoryStatusApproveMutation();
  const { mutate: rejectMilestoneHistory } = useMilestoneHistoryStatusRejectMutation();
  const { mutate: cancelMilestoneHistory } = useMilestoneHistoryStatusCancelMutation();
  return <div>aaa</div>;
};

export default StatusChangeButton;
