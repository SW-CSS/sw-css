import Sidebar from '@/components/layout/Sidebar';

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
