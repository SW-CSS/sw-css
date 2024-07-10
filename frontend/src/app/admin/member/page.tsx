import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/admin/member/list');
  return null;
};

export default Page;
