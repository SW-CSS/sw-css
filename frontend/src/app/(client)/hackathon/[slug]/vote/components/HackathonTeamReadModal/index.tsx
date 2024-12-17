import PageTitle from '@/components/common/PageTitle';
import { TeamMemberRole, teamMemberRoleInfo } from '@/data/hackathon';
import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { HackathonTeamDto } from '@/types/common.dto';
import { VscHeart } from '@react-icons/all-files/vsc/VscHeart';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ReadmeViewer from '../ReadmeViewer';

interface HackathonTeamReadModalProps {
  selectedTeam: HackathonTeamDto | null;
  onClose: () => void;
}

const HackathonTeamReadModal = ({ selectedTeam, onClose }: HackathonTeamReadModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { lockScroll, unlockScroll } = useBodyScrollLock();

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
      <div
        ref={ref}
        className="flex h-[600px] w-full max-w-[900px] flex-col items-center gap-2 rounded bg-white p-5 sm:h-[700px]"
      >
        <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
          <PageTitle title={selectedTeam.teamName} description={selectedTeam.projectTitle} />
          <div className="flex flex-grow justify-end gap-2">
            <span className="flex items-center gap-1 font-bold text-primary-main">
              <VscHeart />
              {selectedTeam.voteCount}표 득표
            </span>
            <button className="rounded-lg bg-primary-main px-4 py-1 text-lg font-bold text-white">투표하기</button>
          </div>
        </div>
        <div className="flex w-full flex-grow flex-col gap-4 overflow-auto py-4 sm:items-center">
          <div className="h-0 w-full border border-border" />
          <div className="flex w-full flex-wrap gap-4">
            <div className="min-w-[4em] text-lg font-bold">팀 구성</div>
            <div className="flex flex-grow flex-col gap-1 text-xs sm:text-base">
              {Object.values(TeamMemberRole)
                .filter((role) => selectedTeam.teamMembers[role])
                .map((role) => (
                  <div key={role} className="flex w-full items-start gap-2">
                    <div className="flex w-20 items-center gap-2">
                      <Image src={teamMemberRoleInfo[role].img} alt="직군 아이콘" width={24} height={24} />
                      <p className="text-xs text-comment">{teamMemberRoleInfo[role].text}</p>
                    </div>
                    <table>
                      {selectedTeam.teamMembers[role]?.map((member) => (
                        <tr key={member.id} className={classNames(member.isLeader && 'font-bold')}>
                          <td className="min-w-[4em]">{member.name}</td>
                          <td className="min-w-[10em]">{member.id}</td>
                          <td className="hidden min-w-[10em] md:table-cell">{member.major}</td>
                          {member.isLeader && <td className="min-w-[4em]">(팀장)</td>}
                        </tr>
                      ))}
                    </table>
                  </div>
                ))}
            </div>
          </div>
          <div className="h-0 w-full border border-border" />
          <ReadmeViewer repoUrl={selectedTeam.githubUrl} />
        </div>
        <button onClick={onClose} className="rounded bg-background-base px-4 py-2">
          닫기
        </button>
      </div>
    </div>
  );
};

export default HackathonTeamReadModal;
