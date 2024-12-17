import PageTitle from '@/components/common/PageTitle';
import AdminHackathonManageTeamSearchBox from '@/components/ui/admin/hackathon/AdminHackathonManageTeamSearchBox';
import AdminHackathonManageTeamTable from '@/components/ui/admin/hackathon/AdminHackathonManageTeamTable';
import { getAuthFromCookie } from '@/lib/utils/auth';
import { mockHackathonTeamPageableData } from '@/mocks/hackathon';
import { AuthSliceState } from '@/store/auth.slice';
import { headers } from 'next/headers';

export interface AdminHackathonEditPageProps {
  params: { slug: number };
  searchParams?: { [key: string]: string | undefined };
}

export default function AdminHackathonManagePage({ params: { slug }, searchParams }: AdminHackathonEditPageProps) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth: AuthSliceState = getAuthFromCookie();

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  // TODO: api 연결
  const hackathonTeamInfos = mockHackathonTeamPageableData.content;

  return (
    <>
      <PageTitle title="해커톤 관리" className="mb-4" />
      <AdminHackathonManageTeamSearchBox hackathonId={slug} count={hackathonTeamInfos.length} keyword={keyword} />
      <AdminHackathonManageTeamTable hackathonId={slug} teamInfos={hackathonTeamInfos} />
    </>
  );
}
