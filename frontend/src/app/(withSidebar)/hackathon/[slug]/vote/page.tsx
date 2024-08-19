import Pagination from '@/app/components/Pagination';
import { getHackathonTeams } from '@/lib/api/server.api';
import Image from 'next/image';
import Link from 'next/link';

interface HackathonVotePageProps {
  params: {
    slug: number;
  };
  searchParams?: { [key: string]: string | undefined };
}

const Page = async ({ params: { slug }, searchParams }: HackathonVotePageProps) => {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const teams = await getHackathonTeams(slug, page, 8);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.content.map((team) => (
          <Link href={`/hackathon/${slug}/teams/${team.id}`} className="rounded pb-4 shadow-md">
            <div className="relative h-28 w-full">
              <Image
                src={process.env.NEXT_PUBLIC_FILE_URL + '/' + team.thumbnailImageName}
                alt="팀 섬네일"
                className="rounded-t-sm"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={100}
              />
            </div>
            <p className="m-2 font-bold">{team.name}</p>
            <div className="flex justify-end">
              <span className="ml-4 flex-grow rounded-l-2xl border border-r-0 border-primary-main p-2 text-lg text-primary-main">
                {team.voteCount}표 득표
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageSize={8}
        totalItems={teams.totalElements}
        pathname={`/hackathon/${slug}/vote`}
      />
    </div>
  );
};

export default Page;
