import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import { HackathonTeamDto } from '@/types/common.dto';
import { Dispatch, SetStateAction } from 'react';

interface HackathonTeamReadModalProps {
  selectedTeam: HackathonTeamDto | null;
  setSelectedTeam: Dispatch<SetStateAction<HackathonTeamDto | null>>;
}
const HackathonTeamReadModal = ({ selectedTeam, setSelectedTeam }: HackathonTeamReadModalProps) => {
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  if (selectedTeam === null) {
    unlockScroll();
    return null;
  }
  lockScroll();
  return (
    <div className="fixed inset-0 z-[51] flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-30">
      <div>
        {selectedTeam.name}
        <button onClick={() => setSelectedTeam(null)}>fjslfjsdl</button>
      </div>
    </div>
  );
};

export default HackathonTeamReadModal;
