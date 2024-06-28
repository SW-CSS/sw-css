'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/constants';

interface SquareProps {
  size: number;
  color: string;
}

export const TableWrapper = styled.div`
  flex-grow: 1;
  max-width: 300px;
  display: grid;
  grid-template-columns: 70% 30%;
  color: ${COLOR.comment};
  text-align: center;
  align-content: center;
`;

export const TableTopBorderContent = styled.div`
  padding: 4px;
  border-top: 1px solid ${COLOR.black_text};
  font: ${FONT_STYLE.xs.normal};
`;

export const TableBottomBorderContent = styled.div`
  padding: 4px;
  border-bottom: 1px solid ${COLOR.border};
  font: ${FONT_STYLE.xs.normal};
`;

export const TableTitle = styled(TableBottomBorderContent)`
  color: ${COLOR.black_text};
  font: ${FONT_STYLE.xs.semibold};
`;

export const ScoreContent = styled(TableBottomBorderContent)`
  display: flex;
  padding-left: 14px;
  align-items: center;
  gap: 4px;
`;

export const Square = styled.div<SquareProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => props.color};
`;
