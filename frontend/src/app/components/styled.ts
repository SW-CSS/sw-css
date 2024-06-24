'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/constants';

export const Title = styled.p`
  font: ${FONT_STYLE.xl.semibold};
`;

export const Description = styled.p`
  font: ${FONT_STYLE.sm};
  color: ${COLOR.comment};
`;
