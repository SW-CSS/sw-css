'use client';

import { useRouter } from 'next/navigation';

import { useMilestoneHistoryDeleteMutation } from '@/lib/hooks/useApi';

interface MilestoneHistoryDeleteButtonProps {
  historyId: number;
}

const MilestoneHistoryDeleteButton = ({ historyId }: MilestoneHistoryDeleteButtonProps) => {
  const router = useRouter();
  const { mutate: deleteMilestoneHistory } = useMilestoneHistoryDeleteMutation();

  const handleHistoryDeleteButtonClick = () => {
    if (window.confirm('정말로 실적 내역을 삭제하시겠습니까?')) {
      deleteMilestoneHistory(historyId, {
        onSuccess: () => {
          if (router) router.refresh();
        },
        onError: () => {
          window.alert('삭제에 실패하였습니다.');
        },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleHistoryDeleteButtonClick}
      className="rounded-sm bg-red-400 px-4 py-2 text-white"
    >
      삭제
    </button>
  );
};

export default MilestoneHistoryDeleteButton;
