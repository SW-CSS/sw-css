'use client';

import { hackathonInformationTypes } from '@/data/hackathon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface HackathonInformationTypeButtonsProps {
  slug: number;
}
const HackathonInformationTypeButtons = ({ slug }: HackathonInformationTypeButtonsProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap border-b border-border">
      {hackathonInformationTypes.map((type) => (
        <Link
          href={type.path(slug)}
          className={`h-[30px] border-0 bg-white px-4 ${pathname === type.path(slug) ? 'border-b-2 font-bold text-black' : 'text-comment'} border-black hover:border-b-2 hover:text-black`}
          key={type.name}
        >
          {type.name}
        </Link>
      ))}
    </div>
  );
};

export default HackathonInformationTypeButtons;
