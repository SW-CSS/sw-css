/* eslint-disable max-len */
import Link from 'next/link';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pathname: string;
  query?: string;
}

const Pagination = ({ currentPage, totalItems, pathname, query }: PaginationProps) => {
  const ItemPerPage = 10;
  const buttonPerPage = 10;

  const totalPageCount = Math.ceil(totalItems / ItemPerPage);
  const totalPages = Array.from({ length: totalPageCount }, (v, i) => i + 1);

  const showIdx = Math.floor((currentPage - 1) / buttonPerPage);
  const showPage = totalPages.slice(showIdx * buttonPerPage, (showIdx + 1) * buttonPerPage);

  const queries = query ? JSON.parse(query) : null;

  const nextPageCalc = (showIdx + 1) * buttonPerPage + 1;
  const prevPage = showIdx === 0 ? 1 : showIdx * buttonPerPage;
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
          className={`flex h-8 w-8 items-center justify-center p-1 text-sm ${currentPage === page && 'bg-admin-primary-main text-white'}`}
        >
          {page}
        </Link>
      ))}
      <Link href={{ pathname, query: { ...queries, page: nextPage } }} className="h-8 w-8 p-1">
        <VscChevronRight className="h-full w-full text-base" />
      </Link>
    </div>
  );
};

export default Pagination;
