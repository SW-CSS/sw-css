'use client';

import styled from 'styled-components';

import { COLOR, CONTENT_WIDTH, RESPONSIVE_WIDTH } from '@/constants';

export const PageWithSidebarWrapper = styled.div`
  width: 100vw;
  display: flex;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: block;
  }
`;

export const ContentWrapper = styled.div`
  background-color: ${COLOR.background.light};
  flex-grow: 1;
  min-height: calc(100vh - 280px);

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    background-color: ${COLOR.white};
  }
`;

export const Content = styled.div`
  width: ${CONTENT_WIDTH};
  padding: 20px;
  overflow: hidden;
`;
