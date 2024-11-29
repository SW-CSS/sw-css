import Image from 'next/image';

import { externalLinkInfos } from '@/data/externalLink';

import Link from 'next/link';

export default function HomeExternalLink() {
  return (
    <div className="grid grid-cols-3 gap-y-[20px] rounded-sm bg-primary-light p-[10px] md:grid-cols-6">
      {externalLinkInfos.map((link) => {
        const markup = { __html: link.title };
        return (
          <Link
            className="flex flex-col items-center justify-center gap-3"
            key={link.url}
            href={link.url}
            target="_blank"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <Image src={link.img} alt={link.title} width="50" height="50" style={{ width: 50, height: 50 }} />
            </div>
            <div className="h-10 text-center text-xs font-semibold text-black" dangerouslySetInnerHTML={markup} />
          </Link>
        );
      })}
    </div>
  );
}
