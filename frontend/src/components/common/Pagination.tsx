import { VscChevronLeft } from '@react-icons/all-files/vsc/VscChevronLeft';
import { VscChevronRight } from '@react-icons/all-files/vsc/VscChevronRight';
import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pathname: string;
  query?: string;
}

export default function Pagination({ currentPage, pageSize, totalItems, pathname, query }: PaginationProps) {
  const buttonPerPage = 10;

  const totalPageCount = Math.ceil(totalItems / pageSize);
  const totalPages = Array.from({ length: totalPageCount }, (v, i) => i + 1);

  const showIdx = Math.floor((currentPage - 1) / buttonPerPage);
  const showPage = totalPages.slice(showIdx * buttonPerPage, (showIdx + 1) * buttonPerPage);

  const queries = query ? JSON.parse(query) : null;

  const nextPageCalc = (showIdx + 1) * buttonPerPage + 1;
  const prevPage = showIdx <= 1 ? 1 : showIdx * buttonPerPage;
  const nextPage = totalPageCount >= nextPageCalc ? nextPageCalc : totalPageCount;

  return (
    <div className="flex w-full justify-center gap-4 [&>*]:rounded-sm [&>*]:border-[1px] [&>*]:border-admin-border">
      <Link href={{ pathname, query: { ...queries, page: prevPage } }} className="h-8 w-8 p-1">
        <VscChevronLeft className="h-full w-full text-base" />
      </Link>
      {showPage.map((page) => (
        <Link
          href={{ pathname, query: { ...queries, page } }}
          key={page}
          className={`flex h-8 w-8 items-center justify-center p-1 text-sm ${currentPage === page && 'bg-primary-main text-white'}`}
        >
          {page}
        </Link>
      ))}
      <Link href={{ pathname, query: { ...queries, page: nextPage } }} className="h-8 w-8 p-1">
        <VscChevronRight className="h-full w-full text-base" />
      </Link>
    </div>
  );
}
