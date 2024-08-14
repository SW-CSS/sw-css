import Pagination from '@/app/components/Pagination';
import Title from '@/components/Title';
import { getHackathons } from '@/lib/api/server.api';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  const hackathons = await getHackathons(page, 6);

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <Title
        title="창의융합SW해커톤"
        description="소프트웨어융합교육원에서는 2018년부터 매년 창의융합 SW 해커톤을 개최해오고 있습니다."
      />
      <div className="h-0 w-full border border-border" />
      {hackathons?.content && hackathons.content.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
          {hackathons.content.map((hackathon) => (
            <Link
              key={hackathon.id}
              href={`/hackathon/${hackathon.id}`}
              className="flex w-full min-w-[200px] flex-col rounded-sm border-r border-border shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={process.env.NEXT_PUBLIC_FILE_URL + '/' + hackathon.thumbnailImageName}
                  alt={'해커톤 섬네일'}
                  className="rounded-t-sm"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                />
              </div>
              <div className="m-2 flex flex-col items-center justify-center gap-2 text-center">
                <div className="font-bold">{hackathon.name}</div>
                <div className="text-xs text-comment">
                  <p>
                    신청 기간: {hackathon.applyStartDate.replaceAll('-', '.')} ~{' '}
                    {hackathon.applyEndDate.replaceAll('-', '.')}
                  </p>
                  <p>
                    대회 기간: {hackathon.hackathonStartDate.replaceAll('-', '.')} ~{' '}
                    {hackathon.hackathonEndDate.replaceAll('-', '.')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-40 w-full items-center justify-center text-comment">해커톤 정보가 없습니다.</div>
      )}

      <Pagination currentPage={page} totalItems={hackathons?.totalElements ?? 0} pathname={pathname} pageSize={6} />
    </div>
  );
};

export default Page;
