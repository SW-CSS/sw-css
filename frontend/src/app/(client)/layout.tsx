/* eslint-disable @next/next/no-page-custom-font */
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <Header />
    <div className="bg-white" style={{ width: '100vw', minHeight: 'calc(100vh-200px)' }}>
      {children}
    </div>
    <Footer />
  </>
);
export default RootLayout;
