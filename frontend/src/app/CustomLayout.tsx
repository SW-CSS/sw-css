'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper, PageLayout } from './styled';

const CustomLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return <div>{children}</div>;
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
