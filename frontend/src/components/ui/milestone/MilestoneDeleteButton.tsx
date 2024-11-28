'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import { useMilestoneHistoryDeleteMutation } from '@/lib/hooks/useApi';

export interface MilestoneDeleteButtonProps {
  historyId: number;
}

export default function MilestoneDeleteButton({ historyId }: MilestoneDeleteButtonProps) {
  const router = useRouter();
  const { mutate: deleteMilestoneHistory } = useMilestoneHistoryDeleteMutation();

  const handleHistoryDeleteButtonClick = () => {
    if (window.confirm('정말로 실적 내역을 삭제하시겠습니까?')) {
      deleteMilestoneHistory(historyId, {
        onSuccess: () => {
          if (router) router.refresh();
        },
        onError: () => {
          toast.error('삭제에 실패하였습니다.');
        },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleHistoryDeleteButtonClick}
      className="rounded-sm bg-red-400 px-4 py-1 text-sm text-white"
    >
      삭제
    </button>
  );
}
