import { headers } from 'next/headers';

import AdminFooter from '@/adminComponents/Footer';
import AdminHeader from '@/adminComponents/Header';
import AdminSidebar from '@/adminComponents/Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper, PageLayout, AdminPageWrapper, AdminPageLayout } from './styled';

const CustomLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';

  if (headerPathname.startsWith('/admin')) {
    return (
      <>
        <AdminHeader />
        <AdminSidebar />
        <AdminPageWrapper>
          <AdminPageLayout>{children}</AdminPageLayout>
          <AdminFooter />
        </AdminPageWrapper>
      </>
    );
  }
  return (
    <>
      <Header />
      <PageWrapper>
        <PageLayout>{children}</PageLayout>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default CustomLayout;
