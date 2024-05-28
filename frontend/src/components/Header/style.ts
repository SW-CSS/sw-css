'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { MAX_WIDTH, RESPONSIVE_WIDTH, FONT_STYLE, COLOR, BORDER_RADIUS } from '@/constants';

export const HeaderWrapper = styled.div`
  position: fixed;
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
  background-color: ${COLOR.malibu};
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

/* start of HeaderAccordion 에서 사용되는 컴포넌트 */
export const HeaderAccordionWarper = styled.div`
  position: relative;
  height: 76px;
  line-height: 76px;
  align-items: center;
  &:hover {
    > div {
      max-height: 200px;
    }
  }
`;

export const Linker = styled(Link)`
  padding: 0 40px;
  font: ${FONT_STYLE.lg.semibold};
  &:hover {
    color: ${COLOR.malibu_dark};
  }
`;

export const AccordionLink = styled(Link)`
  display: block;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.border};
  &:hover {
    color: ${COLOR.malibu_dark};
  }
`;

export const Accordion = styled.div`
  position: absolute;
  width: 180px;
  max-height: 0;
  text-align: center;
  font: ${FONT_STYLE.sm};
  color: ${COLOR.comment};
  background-color: white;
  border-bottom-left-radius: ${BORDER_RADIUS.sm};
  border-bottom-right-radius: ${BORDER_RADIUS.sm};
  box-shadow: 0px 2px 5px rgb(0, 0, 0, 0.25);
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  transition: max-height 0.4s ease-in-out;
  overflow: hidden;
`;
/* end of HeaderAccordion 에서 사용되는 컴포넌트 */

/* start of Hamburger 에서 사용되는 컴포넌트 */
export const HamburgerWarper = styled.div`
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
/* end of Hamburger에서 사용되는 컴포넌트 */
