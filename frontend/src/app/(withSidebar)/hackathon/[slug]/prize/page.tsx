import { getHackathonPrize } from '@/lib/api/server.api';

interface HackathonPrizePageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params: { slug } }: HackathonPrizePageProps) => {
  const prizes = await getHackathonPrize(slug);
  if (!prizes || prizes.length == 0)
    return (
      <div className="flex h-40 w-full items-center justify-center text-comment">수상 결과가 공개되지 않았습니다.</div>
    );
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white">
      <table className="border-collapse text-center">
        <thead>
          <tr className="border-y-2 border-primary-main bg-primary-light text-primary-main">
            <th className="py-2">상훈</th>
            <th>수상팀(팀원수)</th>
            <th>수상 작품</th>
          </tr>
        </thead>
        <tbody>
          {prizes.map((prize) => (
            <>
              <tr className="border-y border-border">
                <td rowSpan={prize.teams.length} className="py-2">
                  {prize.name}
                </td>
                <td className="py-2">
                  {prize.teams[0].name}({prize.teams[0].memberCount})
                </td>
                <td>{prize.teams[0].work}</td>
              </tr>
              {prize.teams.slice(1).map((team) => (
                <tr key={team.name} className="border-y border-border">
                  <td className="py-2">
                    {team.name}({team.memberCount})
                  </td>
                  <td>{team.work}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
