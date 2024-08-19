import { useState } from 'react';
import { InformationType } from '../HackathonInformation';
import Image from 'next/image';
import { HackathonInformationDto } from '@/types/common.dto';

interface InformationContentProps {
  informationType: InformationType;
  information: HackathonInformationDto;
}

const InformationContent = ({ informationType, information }: InformationContentProps) => {
  switch (informationType) {
    case InformationType.NOTICE:
      return (
        <div>
          <div className="relative h-60 w-full">
            <Image
              src={process.env.NEXT_PUBLIC_FILE_URL + '/' + information.thumbnailImageName}
              alt="해커톤 섬네일"
              className="rounded-t-sm"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
            />
          </div>
          <div className="m-2 flex flex-col justify-center gap-2">
            <div className="text-lg font-bold">{information.name} 참가자 모집 안내</div>
            <div className="text-xs text-comment">{information.content}</div>
          </div>
        </div>
      );
    case InformationType.VOTE:
      return <div>ttt</div>;
    case InformationType.PRIZE:
      return <div>sss</div>;
    default:
      return null;
  }
};

export default InformationContent;
