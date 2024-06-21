'use client';

import styled from 'styled-components';

import { COLOR, RESPONSIVE_WIDTH } from '@/constants';

export const PageWithSidebarWrapper = styled.div`
  width: 100vw;
  height: 100%;
  min-height: calc(100vh - 280px);
  display: flex;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: block;
  }
`;

export const ContentWrapper = styled.div`
  background-color: ${COLOR.gray_bg_light};
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 280px);
  margin: auto;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 970px;
  padding: 20px;
`;
