'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, FONT_STYLE } from '@/constants';

export const Content = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: ${BORDER_RADIUS.sm};
`;

export const Title = styled.div`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.xl.bold};
`;

export const SubTitle = styled.div`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.lg.bold};
  margin-bottom: 25px;
`;
