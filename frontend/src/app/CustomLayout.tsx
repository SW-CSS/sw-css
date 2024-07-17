import { headers } from 'next/headers';

import AdminFooter from '@/adminComponents/Footer';
import AdminHeader from '@/adminComponents/Header';
import AdminSidebar from '@/adminComponents/Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper, AdminPageWrapper } from './layout-styled';

const CustomLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';

  if (headerPathname.startsWith('/admin')) {
    return (
      <>
        <AdminHeader />
        <AdminSidebar />
        <AdminPageWrapper>
          <section className="m-5 min-h-[80vh] min-w-admin rounded-sm bg-white p-5">{children}</section>
          <AdminFooter />
        </AdminPageWrapper>
      </>
    );
  }
  return (
    <>
      <Header />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
};

export default CustomLayout;
