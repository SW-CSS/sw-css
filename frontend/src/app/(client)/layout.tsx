import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-200px)] w-[100vw] bg-white">{children}</div>
      <Footer />
    </>
  );
}
