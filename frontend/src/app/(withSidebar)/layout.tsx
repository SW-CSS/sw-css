/* eslint-disable @next/next/no-page-custom-font */

import Sidebar from '@/components/Sidebar';

import { Content, ContentWrapper, PageWithSidebarWrapper } from './styled';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <PageWithSidebarWrapper>
    <Sidebar />
    <ContentWrapper>
      <Content>{children}</Content>
    </ContentWrapper>
  </PageWithSidebarWrapper>
);
export default Layout;
