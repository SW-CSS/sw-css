'use client';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useSearchParams } from 'next/navigation';

import PeriodSearchBox from '@/components/common/PeriodSearchBox';
import MyPageMilestoneOverview from '@/components/ui/my-page/MyPageMilestoneOverview';
import MilestoneAcceptedTable from '@/components/ui/milestone/MilestoneAcceptedTable';

import { Period } from '@/types/common';

export default function MyPageMilestonePage() {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filterPeriod, setFilterPeriod] = useState<Period>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<Period>(filterPeriod);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setPageNumber(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  return (
    <div className="w-full rounded-sm bg-white p-5">
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <p className="min-w-[10em] text-xl font-bold">마일스톤 획득 내역</p>
        <PeriodSearchBox setPeriod={setFilterPeriod} period={filterPeriod} setSearchPeriod={setSearchFilterPeriod} />
      </div>
      <div className="mb-6 text-lg font-bold">전체 현황</div>
      <MyPageMilestoneOverview searchFilterPeriod={searchFilterPeriod} />
      <div className="my-7 border-b border-dotted border-border" />
      <div className="mb-6 text-lg font-bold">획득 내역</div>
      <MilestoneAcceptedTable searchFilterPeriod={searchFilterPeriod} pageNumber={pageNumber} pageSize={5} />
    </div>
  );
}
