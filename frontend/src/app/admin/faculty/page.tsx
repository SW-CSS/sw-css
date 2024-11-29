import { headers } from 'next/headers';

import AdminSearchBox from '@/components/common/admin/AdminSearchBox';
import AdminPagination from '@/components/common/admin/AdminPagination';
import FacultyMemberTable from '@/components/ui/admin/faculty/FacultyMemberTable';
import { facultyFieldCategories, members } from '@/mocks/adminMember';

import { getFacultyMembers } from '@/lib/api/server.api';
import { AuthSliceState } from '@/store/auth.slice';
import { getAuthFromCookie } from '@/lib/utils/auth';

export interface FacultyListPageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function FacultyListPage({ searchParams }: FacultyListPageProps) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth: AuthSliceState = getAuthFromCookie();

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const field = searchParams?.field ? parseInt(searchParams.field, 10) : -1;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  const facultyMembers = await getFacultyMembers(auth.token, field, keyword, page - 1);

  return (
    <div className="w-full">
      <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <span className="mr-20">
          총 <span className="text-admin-primary-main">{members.length}</span>명의 회원이 있습니다.
        </span>
        <AdminSearchBox
          initialValues={{ field, keyword }}
          fieldCategories={facultyFieldCategories}
          path="/admin/faculty"
        />
      </div>
      {facultyMembers.content.length === 0 ? (
        <div className="p-20 text-center text-lg font-bold">조건에 부합하는 교직원이 없습니다.</div>
      ) : (
        <>
          <FacultyMemberTable members={facultyMembers.content} />
          <AdminPagination
            currentPage={page}
            totalItems={facultyMembers.totalElements}
            pathname={pathname}
            query={JSON.stringify(searchParams)}
          />
        </>
      )}
    </div>
  );
}
