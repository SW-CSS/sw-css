import { headers } from 'next/headers';

import PageTitle from '@/components/common/PageTitle';
import AdminHackathonManageTable from '@/components/ui/admin/hackathon/AdminHackathonManageTable';
import AdminHackathonSearchBox from '@/components/ui/admin/hackathon/AdminHackathonSearchBox';

import { HackathonManagePageableDto } from '@/types/common.dto';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';
import Pagination from '@/components/common/Pagination';

export interface AdminHackathonListPageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default function AdminHackathonListPage({ searchParams }: AdminHackathonListPageProps) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth: AuthSliceState = getAuthFromCookie();

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  // TODO: api 연결
  const hackathonInfos: HackathonManagePageableDto = {
    totalPages: hackathonInfoContent.length / 8,
    totalElements: hackathonInfoContent.length,
    size: 8,
    number: page,
    pageable: '{"page":1,"size":8}',
    numberOfElements: 0,
    empty: false,
    content: hackathonInfoContent,
  };

  return (
    <div className="w-full">
      <PageTitle title="해커톤 목록" />
      <AdminHackathonSearchBox count={hackathonInfos.content.length} page={page} keyword={keyword} status={1} />
      <AdminHackathonManageTable hackathonInfos={hackathonInfos.content.slice(8 * (page - 1), 8 * page)} />
      <Pagination
        currentPage={page}
        totalItems={hackathonInfos.totalElements}
        pathname={pathname}
        pageSize={8}
        query={JSON.stringify(searchParams)}
      />
    </div>
  );
}

const hackathonInfoContent = [
  {
    id: 1,
    title: '제 8회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 2,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 3,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 4,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 5,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 6,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 7,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 8,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 9,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 10,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 11,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
  {
    id: 12,
    title: '제 7회 2024-2 PNU SW+X 문제해결 경진대회',
    hackathonStartDate: '2024-09-01',
    hackathonEndDate: '2024-12-01',
    teamCode: '1234',
    isActive: false,
  },
];
