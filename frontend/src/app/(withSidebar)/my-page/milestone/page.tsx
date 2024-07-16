'use client';

import { DateTime } from 'luxon';
import { useState } from 'react';

import { COLOR } from '@/constants';
import { Period } from '@/types/common';

import MilestoneHistoryTable from './components/MilestoneHistoryTable';
import MilestoneOverview from './components/MilestoneOverview';
import MilestonePeriodSearchForm from './components/MilestonePeriodSearchForm';
import { Content, SubTitle, Title } from './styled';

const Page = () => {
  const [filterPeriod, setFilterPeriod] = useState<Period>({
    startDate: DateTime.now().minus({ years: 1 }).toFormat('yyyy-MM-dd'),
    endDate: DateTime.now().toFormat('yyyy-MM-dd'),
  });
  const [searchFilterPeriod, setSearchFilterPeriod] = useState<Period>(filterPeriod);

  return (
    <Content>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <Title>마일스톤 획득 내역</Title>
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
      {/* TODO 제대로 페이지네이션 처리 하기 */}
      <MilestoneHistoryTable searchFilterPeriod={searchFilterPeriod} page={0} size={10} />
    </Content>
  );
};

export default Page;
