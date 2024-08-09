'use client';

import styled from 'styled-components';

import { COLOR, FONT_STYLE } from '@/constants';

export const TableBody = styled.tbody`
  border-top: 2px solid ${COLOR.black_text};
  border-bottom: 2px solid ${COLOR.black_text};
  font: ${FONT_STYLE.sm.normal};
  > :last-child {
    border-bottom: 0px solid;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${COLOR.border};
  text-align: center;
  > td,
  > th {
    padding: 10px;
  }

  > td:first-child {
    text-align: left;
  }
`;

export const HistoryDescription = styled.td`
  width: 540px;
`;
