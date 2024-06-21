'use client';

import styled from 'styled-components';

import { RESPONSIVE_WIDTH } from '@/constants';

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: calc(100vh - 280px);
  margin-top: 80px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    min-height: calc(100vh - 255px);
    margin-top: 55px;
    display: block;
  }
`;

export const PageLayout = styled.div`
  height: 100%;
  overflow: hidden;
`;
