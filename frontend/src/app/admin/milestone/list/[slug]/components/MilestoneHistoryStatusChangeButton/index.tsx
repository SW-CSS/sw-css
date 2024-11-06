/* eslint-disable implicit-arrow-linebreak */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import TextInput from '@/components/common/formik/TextInput';
import { MilestoneHistoryStatus } from '@/data/milestone';
import {
  useMilestoneHistoryStatusApproveMutation,
  useMilestoneHistoryStatusCancelMutation,
  useMilestoneHistoryStatusRejectMutation,
} from '@/lib/hooks/useAdminApi';
import { convertMilestoneHistoryStatus } from '@/lib/utils/utils';

interface MilestoneHistoryStatusChangeButtonProps {
  historyId: number;
  status: string;
}
const MilestoneHistoryStatusChangeButton = ({ historyId, status }: MilestoneHistoryStatusChangeButtonProps) => {
  const { mutate: approveMilestoneHistory } = useMilestoneHistoryStatusApproveMutation();
  const { mutate: rejectMilestoneHistory } = useMilestoneHistoryStatusRejectMutation();
  const { mutate: cancelMilestoneHistory } = useMilestoneHistoryStatusCancelMutation();
  const [rejectReason, setRejectReason] = useState<string>('');
  const router = useRouter();

  const handleApproveButtonClick = () =>
    approveMilestoneHistory(historyId, {
      onSuccess: () => {
        toast.info('실적 내역을 승인하였습니다.');
        router.refresh();
      },
      onError: () => {
        toast.error('실적 내역을 승인하는 데 실패했습니다.');
      },
    });
  const handleRejectButtonClick = () =>
    rejectMilestoneHistory(
      { historyId, rejectReason },
      {
        onSuccess: () => {
          toast.info('실적 내역을 반려하였습니다.');
          router.refresh();
        },
        onError: () => {
          toast.error('실적 내역을 반려하는 데 실패했습니다.');
        },
      },
    );

  const handleCancelButtonClick = () =>
    cancelMilestoneHistory(historyId, {
      onSuccess: () => {
        toast.info(`${convertMilestoneHistoryStatus(status)}을(를) 취소했습니다.`);
        router.refresh();
      },
      onError: () => {
        toast.error(`${convertMilestoneHistoryStatus(status)} 취소에 실패하였습니다.`);
      },
    });
  switch (status) {
    case MilestoneHistoryStatus.PENDING:
      return (
        <div className="flex items-end justify-center gap-4">
          <button
            type="button"
            onClick={handleApproveButtonClick}
            className="h-full flex-1 rounded-sm bg-admin-primary-light text-white hover:bg-admin-primary-main"
          >
            승인
          </button>
          <div className="h-full w-0 border-l-2 border-border" />
          <div className="flex flex-1 flex-col gap-4">
            <TextInput
              placeholder="반려 사유"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              name="rejectReason"
              className="w-full"
            />
            <button
              type="button"
              onClick={handleRejectButtonClick}
              className="rounded-sm bg-admin-semantic-error-light py-2 text-white hover:bg-admin-semantic-error-main"
            >
              반려
            </button>
          </div>
        </div>
      );
    case MilestoneHistoryStatus.APPROVED:
    case MilestoneHistoryStatus.REJECTED:
      return (
        <button
          type="button"
          onClick={handleCancelButtonClick}
          className="rounded-sm bg-admin-secondary-main py-2 text-white"
        >
          {convertMilestoneHistoryStatus(status)}취소
        </button>
      );
    default:
      return <div className="text-center text-admin-comment">마일스톤 내역의 상태 값에 문제가 있습니다.</div>;
  }
};

export default MilestoneHistoryStatusChangeButton;
