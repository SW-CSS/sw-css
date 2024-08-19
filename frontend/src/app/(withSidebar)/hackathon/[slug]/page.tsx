import Title from '@/components/Title';
import { getHackathonInformation } from '@/lib/api/server.api';
import HackathonInformation from './components/HackathonInformation';

interface HackathonDetailPageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params: { slug } }: HackathonDetailPageProps) => {
  const hackathonInformation = await getHackathonInformation(slug);

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <Title title={hackathonInformation.name} />
      <div className="h-0 w-full border border-border" />
      <HackathonInformation information={hackathonInformation} />
    </div>
  );
};

export default Page;
