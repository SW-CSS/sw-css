'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

export const FooterWrapper = styled.div`
  width: 100vw;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.background.base};
`;

export const FooterLayout = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: 1fr 3fr 105px;
  gap: 20px;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const FooterLogo = styled(Image)`
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    display: none;
  }
`;

export const FooterDiv = styled.div`
  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    text-align: center;
  }
`;

export const FooterText = styled.p`
  font: ${FONT_STYLE.sm};
  color: ${COLOR.comment};
`;

export const FooterLink = styled(Link)`
  width: fit-content;
  height: fit-content;
  font: ${FONT_STYLE.sm};
  color: ${COLOR.comment};
  padding-bottom: 2px;
  border-bottom: 1px solid ${COLOR.comment};
`;
