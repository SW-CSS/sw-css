'use client';

import styled from 'styled-components';

import { BORDER_RADIUS } from '@/adminConstants';
import { COLOR, FONT_STYLE } from '@/constants';

interface GroupButtonProps {
  isSelected: boolean;
}

export const GroupButton = styled.button<GroupButtonProps>`
  color: ${({ isSelected }) => (isSelected ? COLOR.black_text : COLOR.comment)};
  border: none;
  background-color: white;
  flex-grow: 1;
  height: 30px;
  font: ${FONT_STYLE.base.normal};
  border-bottom: ${({ isSelected }) => (isSelected ? '2px solid black' : '0px solid black')};

  &:hover {
    color: ${COLOR.black_text};
    border-bottom: 2px solid black;
  }
`;

export const TableRow = styled.div`
  padding: 7px 0px;
  border-bottom: 1px solid ${COLOR.border};
  font: ${FONT_STYLE.sm.normal};
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

export const TableRowTitle = styled.div`
  flex-shrink: 1;
`;

export const TableRowBar = styled.div`
  background-color: ${COLOR.background.light};
  width: 75px;
  height: 10px;
  border-radius: ${BORDER_RADIUS.lg};
  overflow: hidden;
`;

interface TableRowBarFillProps {
  ratio: number;
}

export const TableRowBarFill = styled.div<TableRowBarFillProps>`
  width: ${({ ratio }) => 100 * ratio}%;
  background-color: ${COLOR.primary.main};
  height: 100%;
`;

export const TableRowScore = styled.div`
  font: ${FONT_STYLE.xs.normal};
  min-width: 45px;
`;
