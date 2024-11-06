/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { headers } from 'next/headers';

import Pagination from '@/adminComponents/Pagination';
import SearchBox from '@/components/common/admin/SearchBox';
import { fieldCategories, members } from '@/mocks/adminMember';

import MemberTable from './components/MemberTable';

const Page = ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const field = searchParams?.field ? parseInt(searchParams.field, 10) : -1;
  const keyword = searchParams?.keyword ? searchParams.keyword : '';

  // TODO: 검색 영역 조회 api 호출
  // TODO: query에 따른 학생 목록 조회 api 호출

  return (
    <div className="w-full">
      <div className="flex h-40 w-full items-center justify-center text-comment">개발 중인 기능입니다.</div>
      {/* <div className="flex items-center rounded-sm border-[1px] border-admin-border bg-admin-background-light px-5 py-3 text-sm">
        <span className="mr-20">
          총 <span className="text-admin-primary-main">{members.length}</span>명의 회원이 있습니다.
        </span>
        <SearchBox initialValues={{ field, keyword }} fieldCategories={fieldCategories} path="/admin/member/list" />
      </div>
      <MemberTable members={members.slice((page - 1) * 10, page * 10)} />
      <Pagination
        currentPage={page}
        totalItems={members.length}
        pathname={pathname}
        query={JSON.stringify(searchParams)}
      /> */}
    </div>
  );
};

export default Page;
