'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const AlertComment = styled.div`
  padding: 8px;
  border-radius: ${BORDER_RADIUS.sm};
  background-color: ${COLOR.background.light};
  font: ${FONT_STYLE.base.normal};
  text-align: center;
  color: ${COLOR.comment};
`;

export const FindLink = styled(Link)`
  font: ${FONT_STYLE.xs.normal};
  color: ${COLOR.comment};
`;

export const SignUpLink = styled(Link)`
  font: ${FONT_STYLE.xs.normal};
  color: ${COLOR.comment};
  text-decoration: underline;
`;

export const SuggestionComment = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  color: ${COLOR.comment};
`;

export const Divisor = styled.div`
  position: relative;
  font: ${FONT_STYLE.xs.normal};
  z-index: 0;

  &::after {
  content: '';
  position: absolute;
  bottom: 25%;
  right: 0;
  height: 50%;
  border-right: 1px solid ${COLOR.comment};
`;
