import PageTitle from '@/components/common/PageTitle';
import { getHackathonInformation } from '@/lib/api/server.api';
import HackathonInformationTypeButtons from './components/HackathonInformationTypeButtons';

const Layout = async ({
  children,
  params: { slug },
}: Readonly<{ children: React.ReactNode; params: { slug: number } }>) => {
  const hackathonInformation = await getHackathonInformation(slug);
  return (
    <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">
      <PageTitle title={hackathonInformation.name} />
      <div className="h-0 w-full border border-border" />
      <HackathonInformationTypeButtons slug={slug} />
      <div>{children}</div>
    </div>
  );
};
export default Layout;
