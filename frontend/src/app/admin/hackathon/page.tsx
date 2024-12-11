import { headers } from 'next/headers';

import PageTitle from '@/components/common/PageTitle';
import AdminHackathonManageTable from '@/components/ui/admin/hackathon/AdminHackathonManageTable';
import AdminHackathonSearchBox from '@/components/ui/admin/hackathon/AdminHackathonSearchBox';

import { HackathonManageDto } from '@/types/common.dto';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { AuthSliceState } from '@/store/auth.slice';

export interface HackathonListPageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default function HackathonListPage({ searchParams }: HackathonListPageProps) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth: AuthSliceState = getAuthFromCookie();

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  // TODO: api 연결
  const hackathonInfos: HackathonManageDto[] = [
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
  ];

  return (
    <div className="w-full">
      <PageTitle title="해커톤 목록" />
      <AdminHackathonSearchBox count={hackathonInfos.length} page={page} keyword={keyword} status={1} />
      <AdminHackathonManageTable hackathonInfos={hackathonInfos} />
    </div>
  );
}
