import Pagination from '@/app/(client)/components/Pagination';
import PageTitle from '@/components2/common/PageTitle';
import { HackathonState } from '@/data/hackathon';
import { getHackathons } from '@/lib/api/server.api';
import classname from 'classnames';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  let hackathons;
  try {
    hackathons = await getHackathons(page, 6);
  } catch (err) {
    // TODO: server api error handling
  }

  const getHackathonState = (startDate: string, endDate: string) => {
    const now = Date.now();
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    if (now < start) return HackathonState.UPCOMING;
    if (end < now) return HackathonState.COMPLETED;
    return HackathonState.IN_PROGRESS;
  };

  const getStatusLabelStyle = (state: HackathonState) => {
    switch (state) {
      case HackathonState.UPCOMING:
        return 'border-green-400';
      case HackathonState.IN_PROGRESS:
        return 'border-primary-main';
      case HackathonState.COMPLETED:
        return 'border-gray-400';
      default:
        return '';
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <PageTitle
        title="창의융합SW해커톤"
        description="소프트웨어융합교육원에서는 2018년부터 매년 창의융합 SW 해커톤을 개최해오고 있습니다."
      />
      <div className="h-0 w-full border border-border" />

      <div className="flex h-40 w-full items-center justify-center text-comment">개발 중인 기능입니다.</div>

      {/* {hackathons?.content && hackathons.content.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 md:grid-cols-3">
          {hackathons.content.map((hackathon) => (
            <Link
              key={hackathon.id}
              href={`/hackathon/${hackathon.id}`}
              className="flex w-full min-w-[200px] flex-col rounded-sm border-r border-border shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={process.env.NEXT_PUBLIC_FILE_URL + '/' + hackathon.bannerImageName}
                  alt={'해커톤 섬네일'}
                  className={classname(
                    'rounded-t-sm',
                    getHackathonState(hackathon.hackathonStartDate, hackathon.hackathonEndDate) ===
                      HackathonState.COMPLETED && 'grayscale',
                  )}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                />
                <div
                  className={classname(
                    'absolute left-0 top-0 h-0 w-0 rounded-ss-sm border-[36px] border-b-transparent border-r-transparent',
                    getStatusLabelStyle(getHackathonState(hackathon.hackathonStartDate, hackathon.hackathonEndDate)),
                  )}
                />
                <div className="absolute left-1 top-4 w-[3em] -rotate-45 text-center text-sm font-bold text-white">
                  {getHackathonState(hackathon.hackathonStartDate, hackathon.hackathonEndDate)}
                </div>
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

      <Pagination currentPage={page} totalItems={hackathons?.totalElements ?? 0} pathname={pathname} pageSize={6} /> */}
    </div>
  );
};

export default Page;
