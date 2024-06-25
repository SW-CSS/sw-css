'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/constants';

export const TitleWrapper = styled.div`
  display: flex;
`;

export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font: ${FONT_STYLE.lg.semibold};
  cursor: default;
`;

export const Description = styled.p`
  font: ${FONT_STYLE.sm.normal};
  color: ${COLOR.comment};
  cursor: default;
`;
