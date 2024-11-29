import AdminFooter from '@/components/layout/AdminFooter';
import AdminHeader from '@/components/layout/AdminHeader';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <div className={`min-h-[100vh] w-[100vw] pl-adminSidebarWidth pt-adminHeaderHeight`}>
        <section className="relative m-5 min-h-[calc(100vh-theme(height.admin-header)-150px)] min-w-admin rounded-sm bg-white p-5">
          {children}
        </section>
        <AdminFooter />
      </div>
    </>
  );
}
