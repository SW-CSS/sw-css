import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface Period {
  startDate: string;
  endDate: string;
}

export interface PeriodSearchBoxProps {
  period: Period;
  setPeriod: Dispatch<SetStateAction<Period>>;
  setSearchPeriod: Dispatch<SetStateAction<Period>>;
}

export default function PeriodSearchBox({ period, setPeriod, setSearchPeriod }: PeriodSearchBoxProps) {
  const handleSearchButtonClick = () => {
    setSearchPeriod(period);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 sm:flex-row">
      <input
        className="rounded-md border-none bg-border p-2 text-center focus:outline-black"
        type="date"
        value={period.startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPeriod({ ...period, startDate: e.target.value })}
      />
      ~
      <input
        className="rounded-md border-none bg-border p-2 text-center focus:outline-black"
        type="date"
        value={period.endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPeriod({ ...period, endDate: e.target.value })}
      />
      <button className="mt-4 rounded-sm bg-black p-[4px_16px] text-white sm:mt-0" onClick={handleSearchButtonClick}>
        검색
      </button>
    </div>
  );
}
