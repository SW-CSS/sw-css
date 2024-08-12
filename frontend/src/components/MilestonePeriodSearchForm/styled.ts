'use client';

import styled from 'styled-components';

import { BORDER_RADIUS, COLOR, RESPONSIVE_WIDTH } from '@/constants';

export const PeriodInput = styled.input`
  text-align: center;
  padding: 8px;
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

  @media screen and (max-width: ${RESPONSIVE_WIDTH.mobile}) {
    margin-top: 16px;
  }
`;
