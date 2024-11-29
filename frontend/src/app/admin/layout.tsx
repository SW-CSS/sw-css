import AdminFooter from '@/adminComponents/Footer';
import AdminSidebar from '@/adminComponents/Sidebar';
import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';
import AdminHeader from '@/components/layout/AdminHeader';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <AdminHeader />
    <AdminSidebar />
    <div className={`min-h-[100vh] w-[100vw] bg-[${COLOR.secondary.light}] pl-adminSidebarWidth pt-adminHeaderHeight`}>
      <section className="relative m-5 min-h-[80vh] min-w-admin rounded-sm bg-white p-5">{children}</section>
      <AdminFooter />
    </div>
  </>
);
export default Layout;
