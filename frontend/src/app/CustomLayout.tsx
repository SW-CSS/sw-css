'use client';

import { usePathname } from 'next/navigation';

import AdminHeader from '@/adminComponents/Header';
import AdminSidebar from '@/adminComponents/Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper, PageLayout } from './styled';
import { COLOR } from '@/constants';

const CustomLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return (
      <>
        <AdminHeader />
        <AdminSidebar />
        <div style={{ backgroundColor: `${COLOR.admin_sub_point_light}` }}>{children}</div>
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
