import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Period } from '@/types/common';

import { PeriodInput, SearchButton } from './styled';

interface MilestonePeriodSearchFormProps {
  filterPeriod: Period;
  setFilterPeriod: Dispatch<SetStateAction<Period>>;
  setSearchFilterPeriod: Dispatch<SetStateAction<Period>>;
}

const MilestonePeriodSearchForm = ({
  filterPeriod,
  setFilterPeriod,
  setSearchFilterPeriod,
}: MilestonePeriodSearchFormProps) => {
  const handleSearchButtonClick = () => {
    setSearchFilterPeriod(filterPeriod);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PeriodInput
        type="date"
        value={filterPeriod.startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterPeriod({ ...filterPeriod, startDate: e.target.value })}
      />
      ~
      <PeriodInput
        type="date"
        value={filterPeriod.endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterPeriod({ ...filterPeriod, endDate: e.target.value })}
      />
      <SearchButton onClick={handleSearchButtonClick}>검색</SearchButton>
    </div>
  );
};

export default MilestonePeriodSearchForm;
