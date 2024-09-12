'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE, RESPONSIVE_WIDTH } from '@/constants';

export const LinkWrapper = styled.div`
  border-radius: ${BORDER_RADIUS.sm};
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
  background-color: ${COLOR.primary.light};

  @media screen and (max-width: ${RESPONSIVE_WIDTH.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.white};
  border-radius: ${BORDER_RADIUS.full};
`;

export const ImageTitle = styled.div`
  height: 40px;
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.xs.semibold};
  text-align: center;
`;
