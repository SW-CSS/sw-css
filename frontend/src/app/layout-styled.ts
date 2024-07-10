'use client';

import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 200px);
  background-color: ${COLOR.white};
`;

export const AdminPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${COLOR.secondary.light};
  padding-top: calc(${ADMIN_HEADER_HEIGHT} + 2px);
  padding-left: ${ADMIN_SIDEBAR_WIDTH};
`;
