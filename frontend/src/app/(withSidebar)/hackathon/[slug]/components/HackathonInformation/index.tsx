'use client';

import { useState } from 'react';
import InformationContent from '../InformationContent';
import { HackathonInformationDto } from '@/types/common.dto';

export enum InformationType {
  NOTICE = '공고',
  VOTE = '투표',
  PRIZE = '수상 결과',
}

interface HackathonInformationProps {
  information: HackathonInformationDto;
}

const HackathonInformation = ({ information }: HackathonInformationProps) => {
  const [informationType, setInformationType] = useState<InformationType>(InformationType.NOTICE);

  return (
    <div>
      <div className="mb-4 flex flex-wrap border-b border-border">
        {Object.values(InformationType).map((type) => (
          <button
            type="button"
            className={`h-[30px] border-0 bg-white px-4 ${informationType === type ? 'border-b-2 font-bold text-black' : 'text-comment'} border-black hover:border-b-2 hover:text-black`}
            key={type}
            onClick={() => setInformationType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <InformationContent informationType={informationType} information={information} />
    </div>
  );
};

export default HackathonInformation;
