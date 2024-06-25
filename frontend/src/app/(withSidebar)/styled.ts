'use client';

import styled from 'styled-components';

import { COLOR, CONTENT_WIDTH, RESPONSIVE_WIDTH } from '@/constants';

export const PageWithSidebarWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  background-color: ${COLOR.background.light};

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: block;
    background-color: ${COLOR.white};
  }
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
`;

export const Content = styled.div`
  width: ${CONTENT_WIDTH};
  height: 100%;
  padding: 100px 20px 20px;
  overflow: hidden;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    padding: 20px;
  }
`;
