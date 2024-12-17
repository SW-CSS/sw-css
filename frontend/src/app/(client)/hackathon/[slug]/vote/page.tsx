'use client';

import Pagination from '@/components/common/Pagination';
import { useHackathonTeamsQuery } from '@/lib/hooks/useApi';
import { HackathonTeamDto } from '@/types/common.dto';
import Image from 'next/image';
import { useState } from 'react';
import HackathonTeamCreateModal from './components/HackathonTeamCreateModal';
import HackathonTeamReadModal from './components/HackathonTeamReadModal';
import { mockHackathonTeamPageableData } from '@/mocks/hackathon';

interface HackathonVotePageProps {
  params: {
    slug: number;
  };
  searchParams?: { [key: string]: string | undefined };
}

const Page = ({ params: { slug }, searchParams }: HackathonVotePageProps) => {
  const [selectedTeam, setSelectedTeam] = useState<HackathonTeamDto | null>(null);
  const [teamCreateModalOpen, setTeamCreateModalOpen] = useState<boolean>(false);

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  // const { data: teams } = useHackathonTeamsQuery(slug, page, 8);
  const teams = mockHackathonTeamPageableData;

  return (
    <div className="flex flex-col gap-4">
      <HackathonTeamReadModal selectedTeam={selectedTeam} onClose={() => setSelectedTeam(null)} />
      <HackathonTeamCreateModal
        hackathonId={slug}
        open={teamCreateModalOpen}
        onClose={() => setTeamCreateModalOpen(false)}
      />
      <div className="flex w-full justify-end">
        <button
          onClick={() => setTeamCreateModalOpen(true)}
          className="rounded bg-primary-main px-4 py-2 text-white transition-colors hover:bg-primary-dark"
        >
          팀 등록하기
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams?.content.map((team) => (
          <button
            key={team.id}
            onClick={() => {
              setSelectedTeam(team);
            }}
            className="rounded pb-4 shadow-md"
          >
            <div className="relative h-28 w-full">
              <Image
                src={process.env.NEXT_PUBLIC_FILE_URL + '/' + team.thumbnailImage}
                alt="팀 섬네일"
                className="rounded-t-sm"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
              />
            </div>
            <p className="m-2 font-bold">{team.teamName}</p>
            <div className="flex justify-end">
              <span className="ml-4 flex-grow rounded-l-2xl border border-r-0 border-primary-main p-2 text-left text-lg text-primary-main">
                {team.voteCount}표 득표
              </span>
            </div>
          </button>
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageSize={8}
        totalItems={teams?.totalElements ?? 0}
        pathname={`/hackathon/${slug}/vote`}
      />
    </div>
  );
};

export default Page;
