/* eslint-disable max-len */
import { headers } from 'next/headers';

import Pagination from '@/adminComponents/Pagination';
import SearchBox from '@/components/SearchBox';
import { milestoneHistorySearchField } from '@/data/milestone';
import { getMilestoneHistories } from '@/lib/api/server.api';

import MilestoneHistoryTable from './components/MilestoneHistoryTable';

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const field = searchParams?.field ? parseInt(searchParams.field, 10) : 0;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  const milstoneHistories = await getMilestoneHistories(field, keyword, page - 1);

  return (
    <div>
      <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <span className="mr-20">
          총 <span className="text-admin-primary-main">{milstoneHistories.totalElements}</span>건의 내역이 있습니다.
        </span>
        <SearchBox
          initialValues={{ field, keyword }}
          fieldCategories={milestoneHistorySearchField}
          path="/admin/milestone/list"
        />
      </div>
      <MilestoneHistoryTable histories={milstoneHistories.content} />
      <Pagination currentPage={page} totalItems={milstoneHistories.totalElements} pathname={pathname} />
    </div>
  );
};

export default Page;
