'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';
import { MdFileDownload } from '@react-icons/all-files/md/MdFileDownload';
import { MdEdit } from '@react-icons/all-files/md/MdEdit';
import { MdSettings } from '@react-icons/all-files/md/MdSettings';

import { HackathonManageDto } from '@/types/common.dto';

export interface AdminHackathonManageTableProps {
  hackathonInfos: HackathonManageDto[];
}

export default function AdminHackathonManageTable({ hackathonInfos }: AdminHackathonManageTableProps) {
  const [hackathons, setHackathon] = useState<HackathonManageDto[]>([]);
  const router = useRouter();

  function handleActiveStatusClick(hackathonId: number) {
    console.log(hackathonId);
    // TODO: API 연결
    setHackathon((prev) =>
      prev.map((hackathon) =>
        hackathon.id === hackathonId ? { ...hackathon, isActive: !hackathon.isActive } : hackathon,
      ),
    );
  }

  function handleManageContestClick(hackathonId: number) {
    router.push(`/admin/hackathon/manage/${hackathonId}`);
  }

  function handleEditContestClick(hackathonId: number) {
    router.push(`/admin/hackathon/edit/${hackathonId}`);
  }

  function handleDeleteContestClick(selectedHackathon: HackathonManageDto) {
    const willDelete = window.confirm(selectedHackathon.title + '을/를 정말 삭제하겠습니까?');
    if (!willDelete) return;

    // TODO: API 연결
    setHackathon((prev) =>
      prev.map((hackathon) => (hackathon.id === selectedHackathon.id ? null : hackathon)).filter((v) => v !== null),
    );
  }

  function handleDownloadVoteResultClick(hackathonId: number) {
    // TODO: API 연결
    console.log(hackathonId, 'clicked');
  }

  useEffect(() => {
    setHackathon(hackathonInfos);
  }, [hackathonInfos, setHackathon]);

  return (
    <div className="min-h-[380px]">
      <table className="my-4 w-full table-fixed text-center text-sm [&_*]:cursor-default">
        <thead className="border-y-2 border-admin-border [&_th]:px-2 [&_th]:py-4">
          <tr>
            <th className="w-20">대회ID</th>
            <th>대회명</th>
            <th className="w-60">대회기간</th>
            <th className="w-32">활성 여부</th>
            <th className="w-20">대회 관리</th>
            <th className="w-20">대회 수정</th>
            <th className="w-20">대회 삭제</th>
            <th className="w-20">투표 결과</th>
          </tr>
        </thead>
        <tbody>
          {hackathons.map((hackathon) => {
            return (
              <tr key={hackathon.id} className="border-b border-admin-border">
                <td>{hackathon.id}</td>
                <td className="py-4 pl-3 text-left font-semibold">{hackathon.title}</td>
                <td className="text-sm">
                  {hackathon.hackathonStartDate} ~ {hackathon.hackathonEndDate}
                </td>
                <td>
                  <button onClick={() => handleActiveStatusClick(hackathon.id)} className="relative mt-1">
                    <div
                      className={`h-6 w-12 rounded-lg transition-colors ${hackathon.isActive ? 'bg-green-400' : 'bg-gray-300'}`}
                    />
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${hackathon.isActive ? 'left-7' : 'left-1'}`}
                    />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleManageContestClick(hackathon.id)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-primary-main"
                  >
                    <MdSettings />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleEditContestClick(hackathon.id)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-primary-main"
                  >
                    <MdEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteContestClick(hackathon)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-semantic-error-light"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDownloadVoteResultClick(hackathon.id)}
                    className="rounded-sm px-3 py-2 text-lg text-admin-secondary-main hover:bg-gray-200 hover:text-admin-secondary-dark"
                  >
                    <MdFileDownload />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
