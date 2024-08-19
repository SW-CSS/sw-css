interface HackathonPrizePageProps {
  params: {
    slug: number;
  };
}

const Page = async ({ params: { slug } }: HackathonPrizePageProps) => {
  return <div className="flex w-full flex-col gap-4 rounded-sm bg-white p-5">{slug} test</div>;
};

export default Page;
