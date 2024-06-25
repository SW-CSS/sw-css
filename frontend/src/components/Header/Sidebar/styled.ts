import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const SidebarWrapper = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

export const HamburgerLogo = styled.div`
  background-color: ${COLOR.primary.main};
  width: 100%;
  height: 100%;
  position: absolute;
  transition: left 0.4s ease-in-out;
`;

export const HamburgerLine = styled.div`
  width: 70%;
  border-radius: ${BORDER_RADIUS.md};
  border: 2px solid ${COLOR.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform 0.4s ease-in-out;
`;

export const SidebarContent = styled.div`
  width: 200px;
  height: 100vh;
  font: ${FONT_STYLE.sm};
  background-color: ${COLOR.white};
  position: absolute;
  transition: left 0.4s ease-in-out;
`;

export const SidebarContentLayout = styled.div`
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

export const SidebarContentTitle = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid ${COLOR.border};
  cursor: default;
  &:hover {
    color: ${COLOR.primary.main};
  }
`;

export const SidebarContentSubTitle = styled(Link)`
  display: block;
  padding: 10px 30px;
  border-bottom: 1px solid ${COLOR.border};
  background-color: ${COLOR.background.light};
  cursor: default;
  color: ${COLOR.comment};
  &:hover {
    color: ${COLOR.primary.main};
  }
`;
