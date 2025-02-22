import Sidebar from '@/components/layout/Sidebar';

export default function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="block w-full bg-white lg:flex lg:bg-background-light" style={{ minHeight: 'calc(100vh-200px)' }}>
      <Sidebar />
      <div className="grow">
        <div className="lg:w-client-content mt-[50px] w-full overflow-hidden p-5 lg:mt-[76px]">{children}</div>
      </div>
    </div>
  );
}
