import MarkdownViewer from '@/components2/ui/hackathon/MarkdownViewer';
import { getHackathonInformation } from '@/lib/api/server.api';
import Image from 'next/image';

interface HackathonDetailPageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params: { slug } }: HackathonDetailPageProps) => {
  const hackathonInformation = await getHackathonInformation(slug);
  return (
    <div>
      <div className="relative h-60 w-full">
        <Image
          src={process.env.NEXT_PUBLIC_FILE_URL + '/' + hackathonInformation.bannerImageName}
          alt="해커톤 섬네일"
          className="rounded-t-sm"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>
      <div className="m-2 flex flex-col justify-center gap-2">
        <div className="text-xl font-bold">{hackathonInformation.name} 참가자 모집 안내</div>
        <MarkdownViewer content={hackathonInformation.content} />
      </div>
    </div>
  );
};

export default Page;
