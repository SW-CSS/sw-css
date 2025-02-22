import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import ReactQueryProvider from '@/lib/utils/reactQueryProvider';
import ReduxProvider from '@/lib/utils/reduxProvider';
import StyledComponentsRegistry from '@/theme/StyledComponentsRegistry';

import './globals.css';
import 'react-toastify/ReactToastify.min.css';

export const metadata: Metadata = {
  title: '부산대학교 SW역량지원시스템',
  description: '',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="kr">
    <head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </head>
    <body style={{ margin: 0 }}>
      <ReactQueryProvider>
        <ReduxProvider>
          <StyledComponentsRegistry>
            {children}
            <ToastContainer autoClose={1500} position="bottom-right" />
          </StyledComponentsRegistry>
        </ReduxProvider>
      </ReactQueryProvider>
    </body>
  </html>
);
export default RootLayout;
