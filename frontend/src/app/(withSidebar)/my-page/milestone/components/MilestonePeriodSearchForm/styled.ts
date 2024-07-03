'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR } from '@/constants';

export const PeriodInput = styled.input`
  text-align: center;
  padding: 8px;
  margin: 0 8px;
  border-radius: ${BORDER_RADIUS.md};
  border: none;
  background-color: ${COLOR.border};

  &:focus {
    outline-color: ${COLOR.black_text};
  }
`;

export const SearchButton = styled.button`
  background-color: ${COLOR.black_text};
  color: white;
  padding: 4px 16px;
  border-radius: ${BORDER_RADIUS.sm};
`;
