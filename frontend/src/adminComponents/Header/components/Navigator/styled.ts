import Link from 'next/link';
import styled from 'styled-components';

import { ADMIN_HEADER_HEIGHT, COLOR, FONT_STYLE } from '@/adminConstants';

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
  background-color: ${COLOR.primary.main};
  color: ${COLOR.white};
  &:after {
    height: 0;
    width: 0;
  }
`;
