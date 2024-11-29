import TeamBuildingCard from '@/components/ui/team-building/TeamBuildingCard';
import GoPageIcon from '@/components/ui/home/GoPageIcon';
import { teamBuildingInfos } from '@/mocks/teamBuilding';

import Link from 'next/link';

export default function HomeTeamBuilding() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">팀 빌딩</p>
          <p className="cursor-default text-sm text-comment">
            프로젝트 팀원을 모집하고 있나요? 함께할 팀을 찾고 있나요?
          </p>
        </div>
        <GoPageIcon name="더보기" url="/team-building" />
      </div>
      <div className="mt-5 grid grid-cols-1 justify-items-center gap-y-4 md:grid-cols-2 lg:grid-cols-3 [&>:nth-child(2)]:hidden md:[&>:nth-child(2)]:block [&>:nth-child(3)]:hidden lg:[&>:nth-child(3)]:block">
        {teamBuildingInfos.length === 0 && (
          <div className="col-start-1 col-end-4 m-2 w-full rounded-sm bg-background-light p-[10px] text-center">
            <p className="m-[10px] font-semibold">아직 팀이 생성되지 않았습니다.</p>
            <p className="m-[10px] text-sm text-comment">지금 바로 새로운 팀을 생성해 보세요! </p>
            <Link className="m-[10px] block text-comment" href="/team-building/create">
              [팀 생성하기]
            </Link>
          </div>
        )}
        {teamBuildingInfos.map((team) => (
          <TeamBuildingCard
            key={team.id}
            id={team.id}
            category={team.category}
            status={team.status}
            title={team.title}
            developer={team.developer}
            designer={team.designer}
            artist={team.artist}
            other={team.other}
            views={team.views}
          />
        ))}
      </div>
    </div>
  );
}
