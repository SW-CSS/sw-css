/* eslint-disable @next/next/no-page-custom-font */

import AdminFooter from '@/adminComponents/Footer';
import AdminHeader from '@/adminComponents/Header';
import AdminSidebar from '@/adminComponents/Sidebar';
import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <AdminHeader />
    <AdminSidebar />
    <div className={`min-h-[100vh] w-[100vw] bg-[${COLOR.secondary.light}] pt-adminHeaderHeight pl-adminSidebarWidth`}>
      <section className="relative m-5 min-h-[80vh] min-w-admin rounded-sm bg-white p-5">{children}</section>
      <AdminFooter />
    </div>
  </>
);
export default Layout;
