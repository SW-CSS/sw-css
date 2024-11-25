import SidebarLayout from '@/components/layout/SidebarLayout';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
