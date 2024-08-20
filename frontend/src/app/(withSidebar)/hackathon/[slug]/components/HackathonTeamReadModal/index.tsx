import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { HackathonTeamDto } from '@/types/common.dto';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

interface HackathonTeamReadModalProps {
  selectedTeam: HackathonTeamDto | null;
  setSelectedTeam: Dispatch<SetStateAction<HackathonTeamDto | null>>;
}
const HackathonTeamReadModal = ({ selectedTeam, setSelectedTeam }: HackathonTeamReadModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { lockScroll, unlockScroll } = useBodyScrollLock();

  const onClose = useCallback(() => {
    setSelectedTeam(null);
  }, [setSelectedTeam]);

  useOnClickOutside(ref, onClose);

  useEffect(() => {
    if (selectedTeam) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [selectedTeam, lockScroll, unlockScroll]);

  if (!selectedTeam) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-[51] flex items-center justify-center bg-black bg-opacity-30">
      <div ref={ref} className="flex h-40 w-full max-w-80 flex-col items-center justify-center gap-4 rounded bg-white">
        <p>{selectedTeam.name}</p>
        <button onClick={onClose} className="rounded bg-comment px-4 py-2">
          닫기
        </button>
      </div>
    </div>
  );
};

export default HackathonTeamReadModal;
