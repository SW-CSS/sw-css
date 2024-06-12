'use client';

import { usePathname } from 'next/navigation';

import AdminHeader from '@/adminComponents/Header';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper, PageLayout } from './styled';

const CustomLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return (
      <>
        <AdminHeader />
        {children}
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
