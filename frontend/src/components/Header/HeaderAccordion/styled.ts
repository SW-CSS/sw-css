import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const HeaderAccordionWrapper = styled.div`
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
    color: ${COLOR.primary.dark};
  }
`;

export const AccordionLink = styled(Link)`
  display: block;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.border};
  &:hover {
    color: ${COLOR.primary.dark};
  }
`;

export const Accordion = styled.div`
  position: absolute;
  width: 180px;
  max-height: 0;
  text-align: center;
  font: ${FONT_STYLE.sm.normal};
  color: ${COLOR.comment};
  background-color: ${COLOR.white};
  border-bottom-left-radius: ${BORDER_RADIUS.sm};
  border-bottom-right-radius: ${BORDER_RADIUS.sm};
  box-shadow: 0px 2px 5px rgb(0, 0, 0, 0.25);
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  transition: max-height 0.4s ease-in-out;
  overflow: hidden;
`;
