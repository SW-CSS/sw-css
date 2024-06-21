'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, ADMIN_SIDEBAR_WIDTH, COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  background: white;
  border-bottom: 2px solid ${COLOR.admin_point};
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    width: ${RESPONSIVE_WIDTH.desktop};
  }
`;

export const HeaderLayout = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLinker = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  height: ${ADMIN_HEADER_HEIGHT};
  padding: 0 20px;
  color: ${COLOR.comment};
  font: ${FONT_STYLE.base.normal};
  &:after {
    content: '';
    background: ${COLOR.border};
    position: absolute;
    top: 15%;
    left: 0;
    height: 70%;
    width: 1px;
  }
`;

export const HeaderLinkerPoint = styled(HeaderLinker)`
  background-color: ${COLOR.admin_point};
  color: white;
  &:after {
    height: 0;
    width: 0;
  }
`;

export const LogoLink = styled(Link)`
  width: ${ADMIN_SIDEBAR_WIDTH};
  margin: auto;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
