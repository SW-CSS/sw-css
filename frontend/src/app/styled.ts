'use client';

import styled from 'styled-components';

import { RESPONSIVE_WIDTH } from '@/constants';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 280px);
  margin-top: 80px;
  display: flex;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    min-height: calc(100vh - 255px);
    margin-top: 55px;
    display: block;
  }
`;

export const PageLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
`;
