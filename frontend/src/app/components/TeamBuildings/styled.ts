'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

export const TeamBuildingWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  justify-items: center;

  @media screen and (max-width: ${RESPONSIVE_WIDTH.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    > :nth-child(3) {
      display: none;
    }
  }
  @media screen and (max-width: ${RESPONSIVE_WIDTH.tablet}) {
    grid-template-columns: repeat(1, 1fr);
    > :nth-child(2) {
      display: none;
    }
  }
`;

export const AlertComment = styled.div`
  grid-column: 1 / 4;
  width: 100%;
  margin: 8px;
  border-radius: ${BORDER_RADIUS.sm};
  background-color: ${COLOR.background.light};
  padding: 10px;
  text-align: center;
`;

export const AlertTitle = styled.p`
  margin: 10px;
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.base.semibold};
`;

export const AlertDescription = styled.p`
  margin: 10px;
  color: ${COLOR.comment};
  font: ${FONT_STYLE.sm.normal};
`;

export const AlertLink = styled(Link)`
  display: block;
  margin: 10px;
  color: ${COLOR.comment};
  font: ${FONT_STYLE.base.normal};
`;
