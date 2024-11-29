import { CgEye } from '@react-icons/all-files/cg/CgEye';
import Image from 'next/image';

import { TeamBuildingDto } from '@/types/common.dto';

import Link from 'next/link';

export const TEAM_STATUS = {
  RECRUITING: {
    color: '#FAD3CA',
    text: '모집 중',
  },
  RECRUITMENT_END: {
    color: '#DEE3EB',
    text: '모집마감',
  },
};

export default function TeamBuildingCard({
  id,
  category,
  status,
  title,
  developer,
  designer,
  artist,
  other,
  views,
}: TeamBuildingDto) {
  const recruitment = [
    { img: '/images/teamBuilding/team_type_img_1.svg', text: '개발', count: developer },
    { img: '/images/teamBuilding/team_type_img_2.svg', text: '디자인', count: artist },
    { img: '/images/teamBuilding/team_type_img_3.svg', text: '기획', count: designer },
    { img: '/images/teamBuilding/team_type_img_4.svg', text: '기타', count: other },
  ];
  return (
    <Link className="w-[360px] overflow-hidden rounded-sm border-2 border-border" href={`/team-building/${id}`}>
      <div className="flex items-center gap-[10px]">
        <p className="rounded-br-sm bg-border p-[6px_12px] text-base font-semibold text-black">{category}</p>
        <p
          className="rounded-sm border p-[2px_8px] text-sm font-normal"
          style={{ borderColor: TEAM_STATUS[status].color, color: TEAM_STATUS[status].color }}
        >
          {TEAM_STATUS[status].text}
        </p>
      </div>
      <div className="m-[8px_16px_16px] flex flex-col gap-3 overflow-hidden">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-black hover:break-keep">
          {title}
        </p>
        <div className="flex justify-center gap-4">
          {recruitment.map((item) => {
            if (item.count !== 0) {
              return (
                <div className="flex items-center gap-1" key={`${id}-${item.text}`}>
                  <Image src={item.img} alt={item.text} width="30" height="30" priority={false} />
                  <div className="text-center text-sm font-semibold text-comment">
                    {item.text}
                    <br />
                    <span className="text-black">{item.count}명</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="flex items-center justify-end gap-2 text-comment">
          <CgEye className="text-comment" />
          {views}
        </div>
      </div>
    </Link>
  );
}
