/* eslint-disable @next/next/no-page-custom-font */

import Header from '@/components/Header';
import Footer from '@/components2/layout/Footer';

import { PageWrapper } from './layout-styled';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <PageWrapper>{children}</PageWrapper>
    <Footer />
  </>
);
export default RootLayout;
