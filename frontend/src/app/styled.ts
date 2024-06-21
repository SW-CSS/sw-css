'use client';

import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR, RESPONSIVE_WIDTH } from '@/constants';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 280px);
  margin-top: 80px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    min-height: calc(100vh - 255px);
    margin-top: 55px;
  }
`;

export const PageLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
`;

export const AdminPageWrapper = styled.div`
  background-color: ${COLOR.admin_sub_point_light};
  min-height: 100vh;
  padding-top: ${ADMIN_HEADER_HEIGHT};
  padding-left: ${ADMIN_SIDEBAR_WIDTH};
`;

export const AdminPageLayout = styled.div`
  min-height: calc(100vh - ${ADMIN_HEADER_HEIGHT} - 42px);
`;
