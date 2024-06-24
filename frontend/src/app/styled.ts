'use client';

import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';
import { RESPONSIVE_WIDTH } from '@/constants';

export const PageWrapper = styled.div`
  width: 100vw;
  background-color: white;
  min-height: calc(100vh - 200px);
  padding-top: 80px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    padding-top: 55px;
  }
`;

export const PageLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
`;

export const AdminPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${COLOR.secondary.light};
  padding-top: ${ADMIN_HEADER_HEIGHT};
  padding-left: ${ADMIN_SIDEBAR_WIDTH};
`;

export const AdminPageLayout = styled.div`
  min-height: calc(100vh - ${ADMIN_HEADER_HEIGHT} - 50px);
`;

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const FlexContentWrapper = styled(ContentWrapper)`
  width: 800px;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    width: 100%;
  }
`;

export const AnnouncementContent = styled(ContentWrapper)`
  flex-grow: 1;
`;
