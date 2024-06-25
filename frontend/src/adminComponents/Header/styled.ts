'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { ADMIN_SIDEBAR_WIDTH, COLOR } from '@/adminConstants';

export const HeaderWrapper = styled.div`
  position: fixed;
  width: 100vw;
  background: ${COLOR.white};
  border-bottom: 2px solid ${COLOR.primary.main};
`;

export const HeaderLayout = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  width: ${ADMIN_SIDEBAR_WIDTH};
  margin: auto;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
