'use client';

import styled from 'styled-components';

import { COLOR } from '@/constants';

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid ${COLOR.border};
`;

export const HeaderLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
`;
