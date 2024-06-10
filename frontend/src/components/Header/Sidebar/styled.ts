import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const HamburgerWrapper = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

export const HamburgerLogo = styled.div`
  background-color: ${COLOR.malibu};
  width: 100%;
  height: 100%;
  position: absolute;
  transition: left 0.4s ease-in-out;
`;

export const HamburgerLine = styled.div`
  width: 70%;
  border-radius: ${BORDER_RADIUS.md};
  border: 2px solid white;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform 0.4s ease-in-out;
`;

export const HamburgerContent = styled.div`
  width: 200px;
  height: 100vh;
  font: ${FONT_STYLE.sm};
  background-color: white;
  position: absolute;
  transition: left 0.4s ease-in-out;
`;

export const HamburgerContentLayout = styled.div`
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

export const HamburgerContentTitle = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid ${COLOR.border};
  cursor: default;
  &:hover {
    color: ${COLOR.malibu};
  }
`;

export const HamburgerContentSubTitle = styled(Link)`
  display: block;
  padding: 10px 30px;
  border-bottom: 1px solid ${COLOR.border};
  background-color: ${COLOR.gray_bg};
  cursor: default;
  color: ${COLOR.comment};
  &:hover {
    color: ${COLOR.malibu};
  }
`;
