/* eslint-disable @next/next/no-page-custom-font */
import { Metadata } from 'next';

import ReduxProvider from '@/lib/utils/reduxProvider';
import StyledComponentsRegistry from '@/theme/StyledComponentsRegistry';

import CustomLayout from './CustomLayout';

import './globals.css';

export const metadata: Metadata = {
  title: '부산대학교 SW역량지원시스템',
  description: '',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="kr">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet" />
    </head>
    <body style={{ margin: 0 }}>
      <ReduxProvider>
        <StyledComponentsRegistry>
          <CustomLayout>{children}</CustomLayout>
        </StyledComponentsRegistry>
      </ReduxProvider>
    </body>
  </html>
);
export default RootLayout;
