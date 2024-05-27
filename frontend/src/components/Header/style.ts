'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { MAX_WIDTH, FONT_STYLE, COLOR, BORDER_RADIUS } from '@/constants';

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  padding: 0 12px;
  border-bottom: 1px solid ${COLOR.border};
`;

export const HeaderLayout = styled.div`
  max-width: ${MAX_WIDTH};
  margin: auto;
  display: flex;
  align-items: center;
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
