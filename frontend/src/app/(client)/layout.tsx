/* eslint-disable @next/next/no-page-custom-font */

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { PageWrapper } from './layout-styled';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <PageWrapper>{children}</PageWrapper>
    <Footer />
  </>
);
export default RootLayout;
