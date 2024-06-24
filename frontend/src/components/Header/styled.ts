'use client';

import styled from 'styled-components';

import { MAX_WIDTH, RESPONSIVE_WIDTH, FONT_STYLE, COLOR, BORDER_RADIUS } from '@/constants';

export const HeaderWrapper = styled.div`
  position: fixed;
  background-color: white;
  width: 100vw;
  border-bottom: 1px solid ${COLOR.border};
`;

export const HeaderDesktopLayout = styled.div`
  max-width: ${MAX_WIDTH};
  margin: auto;
  display: flex;
  align-items: center;
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: none;
  }
`;

export const HeaderTabletLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: none;
  }
`;

export const SignButton = styled.div`
  background-color: ${COLOR.primary.main};
  padding: 10px 20px;
  border-radius: ${BORDER_RADIUS.md};
`;

export const SignText = styled.span`
  font: ${FONT_STYLE.sm};
  color: white;
`;

export const SidebarBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
