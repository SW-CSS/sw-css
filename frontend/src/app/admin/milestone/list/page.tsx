/* eslint-disable max-len */
import { headers } from 'next/headers';

import AdminPagination from '@/components/common/admin/AdminPagination';
import AdminSearchBox from '@/components/common/admin/AdminSearchBox';
import { milestoneHistorySearchField } from '@/data/milestone';
import { getMilestoneHistories } from '@/lib/api/server.api';

import MilestoneHistoryTable from './components/MilestoneHistoryTable';
import MilestoneHistoryExcelFileDownloadButton from './components/MilestoneHistoryTable/MilestoneHistoryExcelFileDownloadButton.tsx';
import { AuthSliceState } from '@/store/auth.slice';
import { getAuthFromCookie } from '@/lib/utils/auth';

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const auth: AuthSliceState = getAuthFromCookie();

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const field = searchParams?.field ? parseInt(searchParams.field, 10) : 0;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  let milestoneHistories;
  try {
    milestoneHistories = await getMilestoneHistories(auth.token, field, keyword, page - 1);
  } catch (err) {
    // TODO: server api error handling...
  }

  return (
    <div>
      <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <span className="mr-20">
          총 <span className="text-admin-primary-main">{milestoneHistories?.totalElements ?? 0}</span>건의 내역이
          있습니다.
        </span>
        <AdminSearchBox
          initialValues={{ field, keyword }}
          fieldCategories={milestoneHistorySearchField}
          path="/admin/milestone/list"
        />
      </div>
      <MilestoneHistoryTable histories={milestoneHistories?.content || []} />
      <div className="flex justify-end">
        <MilestoneHistoryExcelFileDownloadButton field={field} keyword={keyword} />
      </div>
      <AdminPagination
        currentPage={page}
        totalItems={milestoneHistories?.totalElements || 0}
        pathname={pathname}
        query={JSON.stringify({ field, keyword })}
      />
    </div>
  );
};

export default Page;
