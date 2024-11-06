/* eslint-disable @next/next/no-page-custom-font */

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import { PageWrapper } from './layout-styled';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <PageWrapper>{children}</PageWrapper>
    <Footer />
  </>
);
export default RootLayout;
