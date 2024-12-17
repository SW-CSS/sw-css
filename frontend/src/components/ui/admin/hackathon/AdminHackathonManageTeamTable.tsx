'use client';

import { useEffect, useState } from 'react';

import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';
import { MdEdit } from '@react-icons/all-files/md/MdEdit';

import Dropdown from '@/components/common/formik/Dropdown';
import HackathonTeamEditModal from '@/components/ui/hackathon/HackathonTeamEditModal';
import HackathonTeamCreateModal from '@/components/ui/hackathon/HackathonTeamCreateModal';

import { HackathonTeamDto } from '@/types/common.dto';
import { hackathonPrizeCategories, prizeNumberToString, prizeStringToNumber } from '@/data/hackathon';

export interface AdminHackathonManageTeamTableProps {
  hackathonId: number;
  teamInfos: HackathonTeamDto[];
}

export default function AdminHackathonManageTeamTable({ hackathonId, teamInfos }: AdminHackathonManageTeamTableProps) {
  const [teams, setTeams] = useState<HackathonTeamDto[]>([]);
  const [selectedEditTeam, setSelectedEditTeam] = useState<HackathonTeamDto>(initialTeamMember);
  const [teamEditModalOpen, setTeamEditModalOpen] = useState<boolean>(false);
  const [teamCreateModalOpen, setTeamCreateModalOpen] = useState<boolean>(false);

  function handleEditTeamButtonClick(teamInfo: HackathonTeamDto) {
    setSelectedEditTeam(teamInfo);
    setTeamEditModalOpen(true);
  }

  function handleDeleteTeamClick(teamInfo: HackathonTeamDto) {
    const willDelete = window.confirm(teamInfo.teamName + ' 팀 을 정말 삭제하겠습니까?');
    if (!willDelete) return;

    // TODO: API 연결
    setTeams((prev) => prev.map((team) => (team.id === teamInfo.id ? null : team)).filter((v) => v !== null));
  }

  function handleSelectedPrizeChange(teamId: number, value: number) {
    setTeams((prev) =>
      prev.map((team) => (team.id === teamId ? { ...team, prize: prizeNumberToString(value) } : team)),
    );
  }

  function handleStorePrizeButtonClick() {
    // TODO: API 연결
  }

  function handleTeamEditModalClose() {
    setSelectedEditTeam(initialTeamMember);
    setTeamEditModalOpen(false);
  }

  useEffect(() => {
    setTeams(teamInfos);
  }, [teamInfos, setTeams]);

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          className="my-1 rounded-sm bg-admin-secondary-main px-4 text-white hover:bg-admin-secondary-light active:bg-admin-secondary-dark"
          onClick={() => setTeamCreateModalOpen(true)}
        >
          팀 추가
        </button>
        <button
          className="my-1 rounded-sm bg-admin-primary-main px-4 text-white hover:bg-admin-primary-light active:bg-admin-primary-dark"
          onClick={handleStorePrizeButtonClick}
        >
          최종 순위 저장
        </button>
      </div>
      <table className="w-full table-fixed text-center text-sm [&_*]:cursor-default">
        <thead className="border-y-2 border-admin-border [&_th]:px-2 [&_th]:py-4">
          <tr>
            <th className="w-56">팀명</th>
            <th>프로젝트명</th>
            <th className="w-32">득표수</th>
            <th className="w-20">팀 수정</th>
            <th className="w-20">팀 삭제</th>
            <th className="w-32">최종 순위</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((teamInfo) => {
            return (
              <tr key={teamInfo.id}>
                <td className="overflow-hidden text-ellipsis text-nowrap px-4 text-left">{teamInfo.teamName}</td>
                <td className="overflow-hidden text-ellipsis text-nowrap px-4 text-left font-bold">
                  {teamInfo.projectTitle}
                </td>
                <td>{teamInfo.voteCount}</td>
                <td>
                  <button
                    onClick={() => handleEditTeamButtonClick(teamInfo)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-primary-main"
                  >
                    <MdEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteTeamClick(teamInfo)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-semantic-error-light"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td className="px-3">
                  <Dropdown
                    name="field"
                    options={hackathonPrizeCategories}
                    selectOptionText=" "
                    selectedId={prizeStringToNumber(teamInfo.prize)}
                    setFieldValue={(field, value) => handleSelectedPrizeChange(teamInfo.id, value)}
                    size="sm"
                    isAdmin
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end gap-2">
        <button
          className="my-1 rounded-sm bg-admin-secondary-main px-4 text-white hover:bg-admin-secondary-light active:bg-admin-secondary-dark"
          onClick={() => setTeamCreateModalOpen(true)}
        >
          팀 추가
        </button>
        <button
          className="my-1 rounded-sm bg-admin-primary-main px-4 text-white hover:bg-admin-primary-light active:bg-admin-primary-dark"
          onClick={handleStorePrizeButtonClick}
        >
          최종 순위 저장
        </button>
      </div>
      <HackathonTeamCreateModal
        hackathonId={hackathonId}
        isOpen={teamCreateModalOpen}
        onClose={() => setTeamCreateModalOpen(false)}
      />
      <HackathonTeamEditModal
        hackathonId={hackathonId}
        teamInfo={selectedEditTeam}
        isOpen={teamEditModalOpen}
        onClose={handleTeamEditModalClose}
      />
    </>
  );
}

const initialTeamMember: HackathonTeamDto = {
  id: -1,
  teamName: '',
  projectTitle: '',
  githubUrl: '',
  thumbnailImage: '',
  teamMembers: {},
  voteCount: 0,
  prize: 'NONE',
};
