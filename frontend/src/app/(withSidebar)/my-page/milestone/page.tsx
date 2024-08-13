'use client';

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { COLOR } from '@/constants';
import { Period } from '@/types/common';

import MilestoneHistoryTable from './components/MilestoneHistoryTable';
import MilestoneOverview from './components/MilestoneOverview';
import { Content, SubTitle } from './styled';
import MilestonePeriodSearchForm from '../../../../components/MilestonePeriodSearchForm';
import { useSearchParams } from 'next/navigation';

const Page = () => {
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
    <Content>
      <div className="mb-6 flex flex-wrap justify-between gap-4">
        <p className="min-w-[10em] text-xl font-bold">마일스톤 획득 내역</p>
        <MilestonePeriodSearchForm
          setFilterPeriod={setFilterPeriod}
          filterPeriod={filterPeriod}
          setSearchFilterPeriod={setSearchFilterPeriod}
        />
      </div>
      <SubTitle>전체 현황</SubTitle>
      <MilestoneOverview searchFilterPeriod={searchFilterPeriod} />
      <div style={{ borderBottom: `1px dotted ${COLOR.border}`, margin: '30px 0px' }} />
      <SubTitle>획득 내역</SubTitle>
      <MilestoneHistoryTable searchFilterPeriod={searchFilterPeriod} pageNumber={pageNumber} pageSize={5} />
    </Content>
  );
};

export default Page;
